import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignup = () => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})

    const submitHandler = (e) => {
        e.preventDefault()

        const newUser = {
            fullname: {
                firstname,
                lastname
            },
            email,
            password
        }

        setUserData(newUser)

        console.log(newUser)

        setFirstname('')
        setLastname('')
        setEmail('')
        setPassword('')
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img
                    className='w-18 mb-10'
                    src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
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