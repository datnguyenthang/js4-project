import React, { useEffect } from 'react';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import BackendHeader from './header/BackendHeader';
import BackendFooter from './footer/BackendFooter';

const BackendLayout = () => {
    let navigate = useNavigate();
    // Check if user is authenticated
    const isAuthenticated = !!localStorage.getItem('userLoginData');

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/backend/login");
        } else {
            navigate("/backend");
        }
    }, [navigate, isAuthenticated]);

    return (
        <div>
            <BackendHeader />

            {!isAuthenticated && (
                <div className="login-session">
                    {/* Login component can be included here */}
                    {/* For simplicity, assuming login component is rendered by the router */}
                </div>
            )}

            <main className='container mx-auto px-4 py-8'>
                <Outlet />
            </main>

            {/* Footer */}
            <BackendFooter />
        </div>
    );
};

export default BackendLayout;