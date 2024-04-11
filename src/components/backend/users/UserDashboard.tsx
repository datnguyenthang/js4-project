import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as service from "../../../services";
import UserType from '@/src/services/users/UserType';
import { LoaderContext } from '../../context/LoaderContext';

const UserDashboard = () => {

    const [listUser, setListUser] = useState<UserType[]>([]);
    const loadingContext = useContext(LoaderContext);

    useEffect(() => {
        loadingContext.setIsLoader(true);

        const fetchData = async () => {
            try {
                const getAllUsers = await service.getAllUsers();
                setListUser(getAllUsers);
            } catch (error) {
                // Handle errors here
                console.error("Error fetching users:", error);
            } finally {
                loadingContext.setIsLoader(false);
            }
        };

        fetchData();
    }, []);

    const changeStatusUser = async (userId: string, status: boolean) => {
        loadingContext.setIsLoader(true);
        await service.changeStatusActive(userId, !status);
        const updatedUsers = await service.getAllUsers();
        setListUser(updatedUsers);
        loadingContext.setIsLoader(false);  
    }

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                List User
            </h4>
            <Link className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                to="/backend/user/adduser"
            >
                Add users
            </Link>

            <div className="flex flex-col">
                <div className="grid grid-cols-1 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-7">
                    <div className="p-2.5 sm:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            No.
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Username
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Name
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Email
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Role
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Date Created
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Action
                        </h5>
                    </div>
                </div>

                {listUser.map((user: UserType, index) => (
                    <div
                        key={index + 1}
                        className={`grid grid-cols-3 sm:grid-cols-7`}
                    >
                        <div className="flex items-center gap-1 p-2.5 sm:p-5">
                            <p className="hidden text-black dark:text-white sm:block">
                                { index + 1 }
                            </p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">{user?.username}</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-meta-3">{user?.name}</p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-black dark:text-white">{user?.email}</p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-meta-5">{user?.role}</p>
                        </div>
                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 whitespace-nowrap">
                            <p className="text-meta-5">{ user?.createdAt }</p>
                        </div>
                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <button
                                onClick={() => changeStatusUser(user?.id??'', user.active)}
                                className={`w-12 h-6 p-0 m-auto rounded-full flex transition duration-500 shadow-2xl 
                                            ${user.active ? 'focus:ring-2 focus:ring-green-800 justify-end ' : 'focus:ring-2 focus:ring-red-800 justify-start bg-red-500'}
                                            ${user.role === 'admin' ? 'bg-gray-800' : 'bg-green-500'}`
                                        }
                                title={user.active ? 'InActive' : 'Active'}
                                disabled={user.username === 'admin'}
                                >
                                <span
                                    className={`bg-gray-300 transition duration-500 rounded-full w-1/2 h-full m-0 p-0 shadow-xl`}
                                ></span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserDashboard;