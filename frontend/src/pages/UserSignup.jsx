import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
import hoponLogo from "../assets/hopon.png";


const UserSignup = () => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})


    const navigate = useNavigate()
    const { user, setUser } = useContext(UserDataContext)

    const submitHandler = async (e) => {
        e.preventDefault()

        const newUser = {
            fullname: {
                firstname,
                lastname
            },
            email,
            password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)


        if (response.status === 201) {
            const data = response.data

            setUser(data.user)
            localStorage.setItem('token', data.token)
            navigate('/home', { replace: true })
        }

        setFirstname('')
        setLastname('')
        setEmail('')
        setPassword('')
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img
                    className='h-9 mb-10'
                    src={hoponLogo}
                    alt="Uber Logo"
                />

                <form onSubmit={submitHandler}>
                    <h3 className='text-base font-medium mb-2'>
                        Enter your name
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
                        to="/user-login"
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
    )
}

export default UserSignup