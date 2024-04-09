import UserType from '../../../services/users/UserType';
import React, { useState } from 'react';
import * as service from "../../../services";
import { useNavigate } from 'react-router-dom';

enum UserRole {
    Admin = "admin",
    Creator = "creator",
}

const AddUser = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<UserType>({
        username: '',
        email: '',
        name: '',
        password: '',
        role: UserRole.Creator,
        active: true,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        service.addUser(user)
        .then(result => {
            if(result) navigate('/backend/user');
        })
        .catch(e => {
            console.log("Error", e)
        });

    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add User</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
                    <input type="text" id="username" name="username" value={user.username} required pattern="^\S+$" onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <input type="email" id="email" name="email" value={user.email} required onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                    <input type="text" id="name" name="name" value={user.name} required onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                    <input type="password" id="password" name="password" required value={user.password} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role:</label>
                    <select id="role" name="role" value={user.role} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300">
                        {Object.values(UserRole).map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </div>
                {/* Add more input fields for other user properties */}
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Add User</button>
            </form>
        </div>

    );
};

export default AddUser;
