import { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import BackendHeader from './header/BackendHeader';
import BackendFooter from './footer/BackendFooter';
import { UserSessionContext } from '../../hooks/UserContext';
import { LoaderContext } from '../../hooks/LoaderContext';
import Loader from '../../utilities/loader/Loader';

const BackendLayout = () => {
    const navigate = useNavigate();

    const [userSession, setUserSession] = useState<string[]>([]);
    const [isLoader, setIsLoader] = useState<boolean>(false);

    // Check if user is authenticated
    const isAuthenticated = !!localStorage.getItem('userLoginData');

    useEffect(() => {
        if (!isAuthenticated) { 
            navigate("/backend/login");
        } else {
            //in case reload page
            const sessionData = localStorage.getItem('userLoginData'); 
            if(sessionData) setUserSession(JSON.parse(sessionData));
            navigate("/backend");
        }
    }, [isAuthenticated]);

    return (
        <LoaderContext.Provider value={{ isLoader, setIsLoader }}>
            <UserSessionContext.Provider value={{ userSession, setUserSession }}>
                {isLoader && <Loader />}
                <div>
                    <BackendHeader />
                        <main className='container mx-auto px-4 py-8'>
                            <Outlet />
                        </main>
                    <BackendFooter />
                </div>
            </UserSessionContext.Provider>
        </LoaderContext.Provider>
    );
};

export default BackendLayout;