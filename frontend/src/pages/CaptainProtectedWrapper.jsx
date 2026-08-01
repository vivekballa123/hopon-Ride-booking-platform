import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const location = useLocation();

    const { setCaptain } = useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/captain-login', { replace: true });
            return;
        }

        const fetchCaptainProfile = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/captains/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 200) {
                    setCaptain(response.data.captain);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error(err);

                localStorage.removeItem('token');
                navigate('/captain-login', { replace: true });
            }
        };

        fetchCaptainProfile();
    }, [token, navigate, setCaptain]);

    useEffect(() => {
        if (!token) return;

        if (location.pathname === '/captain-login' || location.pathname === '/captain-signup') {
            navigate('/captain-home', { replace: true });
            return;
        }

        if (location.pathname === '/captain-home') {
            window.history.pushState(null, '', window.location.href);
        }
    }, [token, location.pathname, navigate]);

    useEffect(() => {
        if (!token) return;

        const handlePopState = () => {
            window.history.pushState(null, '', window.location.href);
            navigate('/captain-home', { replace: true });
        };

        window.history.pushState(null, '', window.location.href);
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [token, navigate]);

    if (isLoading) {
        return (
        <div className="flex items-center justify-center h-screen bg-white">
            <div className="flex gap-3">
                <div className="w-4 h-4 rounded-full bg-black animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:150ms]"></div>
                <div className="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:300ms]"></div>
            </div>
        </div>
    );
    }

    return <>{children}</>;
};

export default CaptainProtectedWrapper;