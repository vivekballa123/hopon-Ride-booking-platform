import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import hoponLogo from "../assets/hoponrider.png";

import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';

import { CaptainDataContext } from '../context/CaptainContext';
import { SocketDataContext } from '../context/SocketContext';
import { Socket } from 'socket.io-client';
import axios from 'axios';
import LiveTraking from '../components/LiveTraking';



const CaptainHome = () => {

    const [ridePopupPanel, setRidePopupPanel] = useState(false)
    const [ride, setRide] = useState(null)
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)


    const ridePopupPanelRef = useRef(null)
    const confirmedRidePopupPanelRef = useRef(null)

    const { captain } = useContext(CaptainDataContext);
    const { sendMessage, receiveMessage, isConnected } =
        useContext(SocketDataContext);

    useEffect(() => {
        if (!captain?._id || !isConnected) return;

        console.log("Captain Join:", captain._id);

        sendMessage("join", {
            userType: "captain",
            userId: captain._id,
        });
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    console.log({
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    }),
                        sendMessage("update-location-captain", {

                            userId: captain._id,
                            location: {
                                ltd: position.coords.latitude,
                                lng: position.coords.longitude
                            }
                        });
                });
            }
        };

        const locationInterval = setInterval(updateLocation, 5000); // Update location every 5 seconds
        updateLocation(); // Initial location update
        return () => {
            clearInterval(locationInterval);
        };
    }, [captain, isConnected, sendMessage]);

    useEffect(() => {
        const cleanup = receiveMessage("new-ride", (data) => {
            console.log("New Ride Received:", data);

            setRide(data);
            setRidePopupPanel(true);
        });

        return cleanup;
    }, [receiveMessage]);

    const confirmRide = async () => {
        try {
            console.log("Token:", localStorage.getItem("token"));
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
                {
                    rideId: ride._id,
                    captainId: captain._id
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            setRidePopupPanel(false);
            setConfirmRidePopupPanel(true);

        } catch (error) {
            console.log(error.response?.data);
        }
    };

    useGSAP(() => {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ridePopupPanel])

    useGSAP(() => {
        if (confirmRidePopupPanel) {
            gsap.to(confirmedRidePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmedRidePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePopupPanel])

    return (
        <div className='h-screen'>
            <div className='fixed top-0 left-0 z-50 p-6 flex items-center justify-between w-full'>
                <img className='h-15 pt-8' src={hoponLogo} alt="" />
                <Link
                    to="/captain-logout"
                    className="h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-md"
                >
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className='h-3/5'>
                <LiveTraking />

            </div>
            <div className='h-2/5  p-6'>
                <CaptainDetails />
            </div>
            <div ref={ridePopupPanelRef} className='fixed z-10 bottom-0  translate-y-full  py-6 px-3 pt-12 bg-white w-full'>
                <RidePopUp
                    setRidePopupPanel={setRidePopupPanel}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    ride={ride}
                    confirmRide={confirmRide}
                />
            </div>
            <div ref={confirmedRidePopupPanelRef} className='fixed pt-20  items-center z-10 bottom-0 h-screen  translate-y-full  py-6 px-3 pt-12 bg-white w-full'>
                <ConfirmRidePopUp
                    ride={ride}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    setRidePopupPanel={setRidePopupPanel}
                />
            </div>
        </div>
    )
}

export default CaptainHome
