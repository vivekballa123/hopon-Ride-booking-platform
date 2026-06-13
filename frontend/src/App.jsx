import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import CaptainLogin from './pages/CaptainLogin'
import UserSignup from './pages/UserSignup'
import CaptainSignup from './pages/CaptainSignup'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user-login' element={<UserLogin />} />
        <Route path='/captain-login' element={<CaptainLogin />} />  
        <Route path='/user-signup' element={<UserSignup />} /> 
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='*' element={<h1 className='text-3xl font-bold text-center mt-10'>404 Not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App
