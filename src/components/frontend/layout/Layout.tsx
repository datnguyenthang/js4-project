import React, { useEffect, useState } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { LoaderContext } from '../../context/LoaderContext';
import Loader from '../../utilities/loader/Loader';

const Layout = () => {

    const [isLoader, setIsLoader] = useState<boolean>(false);

    return (
        <LoaderContext.Provider value={{ isLoader, setIsLoader }}>
            {isLoader && <Loader />}
            <div>
                <Header />
                    <Outlet />
                <Footer />
            </div>
        </LoaderContext.Provider>
    );
};

export default Layout;
