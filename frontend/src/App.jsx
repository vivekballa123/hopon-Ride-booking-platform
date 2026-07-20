import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import CaptainLogin from './pages/CaptainLogin'
import UserSignup from './pages/UserSignup'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

const App = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) return

    const authRoutes = ['/user-login', '/user-signup', '/captain-login', '/captain-signup', '/']

    if (authRoutes.includes(location.pathname)) {
      const targetRoute = location.pathname.startsWith('/captain') ? '/captain-home' : '/home'
      navigate(targetRoute, { replace: true })
      return
    }

    if (location.pathname === '/home' || location.pathname === '/captain-home') {
      window.history.replaceState(null, '', window.location.href)
    }
  }, [token, location.pathname, navigate])

  useEffect(() => {
    if (!token) return

    const handlePopState = () => {
      const currentPath = window.location.pathname
      const authRoutes = ['/user-login', '/user-signup', '/captain-login', '/captain-signup', '/']

      if (authRoutes.includes(currentPath)) {
        const targetRoute = currentPath.startsWith('/captain') ? '/captain-home' : '/home'
        navigate(targetRoute, { replace: true })
        return
      }

      if (currentPath === '/home' || currentPath === '/captain-home') {
        window.history.replaceState(null, '', window.location.href)
      }
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [token, navigate])

  return (
    <div>
      <Routes>
        <Route path='/' element={token ? <Navigate to='/home' replace /> : <Start />} />
        <Route path='/user-login' element={token ? <Navigate to='/home' replace /> : <UserLogin />} />
        <Route path='/riding' element={<Riding />} />
        <Route path='/captain-login' element={token ? <Navigate to='/captain-home' replace /> : <CaptainLogin />} />
        <Route path='/user-signup' element={token ? <Navigate to='/home' replace /> : <UserSignup />} />
        <Route path='/captain-signup' element={token ? <Navigate to='/captain-home' replace /> : <CaptainSignup />} />
        <Route path='/captain-riding' element={<CaptainRiding />} />
        <Route path='/home' element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
        } />
        <Route path='/users/logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        }></Route>
        <Route path='/captain-home' element={
          <CaptainProtectedWrapper>
            <CaptainHome />
          </CaptainProtectedWrapper>

        } />
        <Route path="/captain-logout" element={
          <CaptainProtectedWrapper>
            <CaptainLogout />
          </CaptainProtectedWrapper>
        } />
        <Route path='*' element={<h1 className='text-3xl font-bold text-center mt-10'>404 Not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App
