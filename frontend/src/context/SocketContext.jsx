import React, { createContext, useCallback, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'

export const SocketDataContext = createContext()

const SocketContext = ({ children }) => {
    const socketRef = useRef(null)
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        const socket = io(import.meta.env.VITE_BASE_URL, {
            withCredentials: true,
             
        })

        socketRef.current = socket

        socket.on('connect', () => {
            setIsConnected(true)
            console.log('Socket connected:', socket.id)
        })

        socket.on('disconnect', () => {
            setIsConnected(false)
            console.log('Socket disconnected')
        })

        return () => {
            socket.off('connect')
            socket.off('disconnect')
            socket.disconnect()
        }
    }, [])

    const sendMessage = useCallback((eventName, payload = {}) => {
        if (socketRef.current?.connected) {
            console.log(`Sending message to server: ${eventName}`, payload)
            socketRef.current.emit(eventName, payload)
            return true
        }

        console.warn('Socket is not connected yet')
        return false
    }, [])

    const receiveMessage = useCallback((eventName, callback) => {
        if (!socketRef.current) {
            return () => { }
        }

        socketRef.current.on(eventName, callback)

        return () => {
            socketRef.current?.off(eventName, callback)
        }
    }, [])

    const value = {
        isConnected,
        sendMessage,
        receiveMessage,
    }

    return (
        <SocketDataContext.Provider value={value}>
            {children}
        </SocketDataContext.Provider>
    )
}

export default SocketContext
