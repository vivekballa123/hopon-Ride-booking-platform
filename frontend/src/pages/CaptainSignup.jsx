 import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainSignup = () => {

    const navigate = useNavigate()
    const [firstname, setFirstname] = useState('')
        const [lastname, setLastname] = useState('')
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
         
        const [vehicleColor, setVehicleColor] = useState('')
        const [vehiclePlate, setVehiclePlate] = useState('')
        const [vehicleCapacity, setVehicleCapacity] = useState('')
        const [vehicleType, setVehicleType] = useState('')

        const{captain,setCaptain} = useContext(CaptainDataContext)
        const submitHandler =async (e) => {
            e.preventDefault()
    
            const captainData = {
                fullname: {
                    firstname,
                    lastname
                },
                email,
                password,
                vehicle:{
                    color:vehicleColor,
                    plate:vehiclePlate,
                    capacity:vehicleCapacity,
                    vehicleType:vehicleType
                }
            }

            
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData)

            if (response.status === 201){
                const data = response.data
                setCaptain(data.captain)
                localStorage.setItem('token',data.token)
                navigate('/captain-home')
            }

            const data = axios
    
            setFirstname('')
            setLastname('')
            setEmail('')
            setPassword('')
            setVehicleCapacity("")
            setVehicleColor('')
            setVehiclePlate('')
            setVehicleType('')
        }
  return (
    <div>
        <div className='py-5 px-5 h-screen flex flex-col justify-between'>
            <div>
                <img
                        className='w-18 mb-1'
                        src="https://pngimg.com/uploads/uber/uber_PNG24.png"
                        alt="Uber Logo"
                    />

                <form onSubmit={submitHandler}>
                    <h3 className='text-base font-medium mb-2'>
                        What's our captain's name
                    </h3>

                    <div className='flex gap-1 mb-5'>
                        <input
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            className="w-1/2 bg-[#eeeeee] rounded px-4 py-2 text-base placeholder:text-sm"
                            required
                            type="text"
                            placeholder="First name"
                        />

                        <input
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            className="w-1/2 bg-[#eeeeee] rounded px-4 py-2 text-base placeholder:text-sm"
                            required
                            type="text"
                            placeholder="Last name"
                        />
                    </div>

                    <h3 className='text-base font-medium mb-2'>
                        What's your email
                    </h3>

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-5 bg-[#eeeeee] rounded px-4 py-2 w-full text-base placeholder:text-sm"
                        required
                        type="email"
                        placeholder="email@example.com"
                    />

                    <h3 className='text-base font-medium mb-2'>
                        Enter Password
                    </h3>

                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-5 bg-[#eeeeee] rounded px-4 py-2 w-full text-base placeholder:text-sm"
                        required
                        type="password"
                        placeholder="password"
                    />

                    <h3 className='text-base font-medium mb-2'>
                        Vehicle Information
                    </h3>

                    <div className='flex gap-4 mb-5'>
                        <input
                            value={vehicleColor}
                            onChange={(e) => setVehicleColor(e.target.value)}
                            className="w-1/2 bg-[#eeeeee] rounded px-4 py-2 text-base placeholder:text-sm"
                            required
                            type="text"
                            placeholder="Vehicle Color"
                        />

                        <input
                            value={vehiclePlate}
                            onChange={(e) => setVehiclePlate(e.target.value)}
                            className="w-1/2 bg-[#eeeeee] rounded px-4 py-2 text-base placeholder:text-sm"
                            required
                            type="text"
                            placeholder="Vehicle Plate"
                        />
                    </div>

                    <div className='flex gap-4 mb-5'>
                        <input
                            value={vehicleCapacity}
                            onChange={(e) => setVehicleCapacity(e.target.value)}
                            className="w-1/2 bg-[#eeeeee] rounded px-4 py-2 text-base placeholder:text-sm"
                            required
                            type="number"
                            placeholder="Vehicle Capacity"
                        />

                        <select
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            className="w-1/2 bg-[#eeeeee] rounded px-4 py-2 text-base"
                            required
                        >
                            <option value="">Select Vehicle Type</option>
                            <option value="car">Car</option>
                            <option value="motorcycle">Motorcycle</option>
                            <option value="auto">Auto</option>
                            <option value="scooter">Scooter</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className='flex items-center justify-center w-full bg-black py-3 rounded mt-5 text-white'
                    >
                        Sign Up
                    </button>
                </form>

                <p className='text-center mt-4'>
                    Already have an Account?{' '}
                    <Link
                        className='text-blue-600'
                        to="/captain-login"
                    >
                        Login here
                    </Link>
                </p>
            </div>

            <div>
                <p className="text-[8px] text-center text-gray-500 px-4">
                    By proceeding, you consent to receive calls, WhatsApp messages,
                    or SMS from Uber and its affiliates regarding your account.
                </p>
            </div>
        </div>
    </div>
  )
}

export default CaptainSignup
