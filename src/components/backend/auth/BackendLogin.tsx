import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as service from "../../../services";
import { LoaderContext } from '../../context/LoaderContext';

const BackendLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const loadingContext = useContext(LoaderContext);

    const navigate = useNavigate();

    const handleLogin = async () => {
        loadingContext.setIsLoader(true);

        if (!username || !password) {
            setError('Please enter both username and password.');
            loadingContext.setIsLoader(false);
            return;
        }

        const user = await service.authBackend(username, password);

        if (!user) {
            setError('Your username and password are incorrect.'); // Fixed typo here
            loadingContext.setIsLoader(false);
            return;
        }

        if (!user.active) {
            setError('Your account has been inactive!'); // Fixed typo here
            loadingContext.setIsLoader(false);
            return;
        }

        const payload = {
            name: user.name,
            email: user.email,
            role: user.role,
            username: user.username
        }

// in case of exceed quota request in firebase
/*
const payload = {
    name: 'admin',
    email: 'admin@admin.com',
    role: 'role',
    username: 'admin'
}
*/
        localStorage.setItem('userLoginData', JSON.stringify(payload));

        loadingContext.setIsLoader(false);
        // Redirect to admin dashboard
        navigate('/backend');
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
            <h5 className="text-sm font-bold mb-4">Admin user: admin/admin</h5>
            <h5 className="text-sm font-bold mb-4">Creator user: creator/creator</h5>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 mb-4 rounded border-gray-300 focus:outline-none focus:border-indigo-500"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mb-4 rounded border-gray-300 focus:outline-none focus:border-indigo-500"
            />

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button onClick={handleLogin} className="w-full bg-indigo-500 text-white p-3 rounded focus:outline-none focus:bg-indigo-600 hover:bg-indigo-600">
                Login
            </button>
        </div>
    );
};

export default BackendLogin;
