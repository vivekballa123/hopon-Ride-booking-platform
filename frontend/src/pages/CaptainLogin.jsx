import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const { captain, setCaptain } = useContext(CaptainDataContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        setError('');

        const captainData = {
            email,
            password,
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/captains/login`,
                captainData
            );

            if (response.status === 200) {
                const data = response.data;

                setCaptain(data.captain);
                localStorage.setItem('token', data.token);

                navigate('/captain-home');
            }

            setEmail('');
            setPassword('');
        } catch (err) {
            setError(
                err.response?.data?.error || 'Invalid email or password'
            );

            setTimeout(() => {
                setError('');
            }, 3000);
        }
    };

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img
                    className='w-18 mb-1'
                    src='https://pngimg.com/uploads/uber/uber_PNG24.png'
                    alt='Uber Logo'
                />

                <form onSubmit={submitHandler}>
                    <h3 className='text-lg font-medium mb-2'>
                        What's your email
                    </h3>

                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className='mb-7 bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-base'
                        required
                        type='email'
                        placeholder='email@example.com'
                    />

                    <h3 className='text-lg font-medium mb-2'>
                        Enter Password
                    </h3>

                    <div className='relative mb-4'>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='bg-[#eeeeee] rounded px-4 py-2 pr-12 w-full text-lg placeholder:text-base'
                            required
                            type={showPassword ? 'text' : 'password'}
                            placeholder='password'
                        />

                        <button
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                            className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer'
                        >
                            {showPassword ? (
                                <EyeOff size={18} strokeWidth={1.75} />
                            ) : (
                                <Eye size={16} strokeWidth={1.5} />
                            )}
                        </button>
                    </div>

                    {error && (
                        <div className='mb-4 rounded-md border border-red-300 bg-red-100 px-4 py-3'>
                            <p className='text-sm font-medium text-red-700'>
                                {error}
                            </p>
                        </div>
                    )}

                    <button
                        type='submit'
                        className='flex items-center justify-center w-full bg-black py-3 rounded mt-5 text-white'
                    >
                        Login
                    </button>
                </form>

                <p className='text-center mt-4'>
                    Join a fleet?{' '}
                    <Link
                        className='text-blue-600'
                        to='/captain-signup'
                    >
                        Register as a Captain
                    </Link>
                </p>
            </div>

            <div>
                <Link
                    to='/user-login'
                    className='flex items-center justify-center w-full bg-[#d5622d] py-3 rounded mt-5 text-white'
                >
                    Sign in as User
                </Link>
            </div>
        </div>
    );
};

export default CaptainLogin;