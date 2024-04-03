import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

const Dashboard = () => {
    /*
    useEffect(() => {
        // Check if user is authenticated and has admin role
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token || role !== 'admin') {
            router.push('/admin');
        }
    }, []);
    */

    return (
        <div>
            {/* Admin Dashboard Content */}
            <h1>Welcome to Admin Dashboard</h1>
        </div>
    );
};

export default Dashboard;
