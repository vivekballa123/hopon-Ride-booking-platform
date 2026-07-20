import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

const UserProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useContext(UserDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/user-login', { replace: true });
            return;
        }

        axios
            .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    setUser(response.data);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                localStorage.removeItem('token');
                navigate('/user-login', { replace: true });
            });
    }, [token, navigate, setUser]);

    useEffect(() => {
        if (!token) return;

        if (location.pathname === '/user-login' || location.pathname === '/user-signup') {
            navigate('/home', { replace: true });
            return;
        }

        if (location.pathname === '/home') {
            window.history.pushState(null, '', window.location.href);
        }
    }, [token, location.pathname, navigate]);

    useEffect(() => {
        if (!token) return;

        const handlePopState = () => {
            window.history.pushState(null, '', window.location.href);
            navigate('/home', { replace: true });
        };

        window.history.pushState(null, '', window.location.href);
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [token, navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default UserProtectedWrapper;