import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
import { Eye, EyeOff } from 'lucide-react'
import hoponLogo from "../assets/hopon.png";

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { user, setUser } = useContext(UserDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();

        setError('');

        const userData = {
            email,
            password,
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/users/login`,
                userData
            );

            if (response.status === 200) {
                const data = response.data;

                setUser(data.user);
                localStorage.setItem('token', data.token);

                navigate('/home', { replace: true });
            }

            setEmail('');
            setPassword('');
        } catch (err) {
            setError(
                err.response?.data?.error || 'Something went wrong'
            );

            setTimeout(() => {
                setError('');
            }, 3000);
        }

    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img
                    className='h-9 mb-10'
                    src={hoponLogo}
                    alt="Uber Logo"
                />

                <form onSubmit={(e) => {
                    submitHandler(e)
                }}>
                    <h3 className='text-lg font-medium mb-2'>
                        What's your email
                    </h3>

                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="mb-7 bg-[#eeeeee] rounded px-4 py-2   w-full text-lg placeholder:text-base"
                        required
                        type="email"
                        placeholder="email@example.com"
                    />

                    <h3 className='text-lg font-medium mb-2'>
                        Enter Password
                    </h3>

                    <div className='relative mb-7'>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-[#eeeeee] rounded px-4 py-2 pr-12   w-full text-lg placeholder:text-base"
                            required
                            type={showPassword ? 'text' : 'password'}
                            placeholder="password"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                        >
                            {showPassword ? (
                                <EyeOff size={18} strokeWidth={1.75} />
                            ) : (
                                <Eye size={16} strokeWidth={1.5} />
                            )}
                        </button>
                    </div>
                    {error && (
                        <div className="mb-4 animate-pulse rounded-lg border-l-4 border-red-600 bg-red-50 p-3">
                            <p className="text-red-600 text-sm">
                                {error}
                            </p>
                        </div>
                    )}
                    <button
                        type="submit"
                        className='flex items-center justify-center w-full bg-black py-3 rounded mt-5 text-white'
                    >
                        Login
                    </button>
                </form>

                <p className='text-center mt-4'>
                    New here?{' '}
                    <Link
                        className='text-blue-600'
                        to="/user-signup"
                    >
                        Create new Account
                    </Link>
                </p>
            </div>

            <div>
                <Link to={'/captain-login'} className='flex items-center justify-center w-full bg-green-600 py-3 rounded mt-5 text-white'>
                    Sign in as Captain
                </Link>
            </div>
        </div>
    )
}

export default UserLogin