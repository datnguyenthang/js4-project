import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

const BackendFooter = () => {

    return (
        <footer className="bg-slate-100 rounded-lg shadow dark:bg-gray-1500 fixed bottom-0 left-0 w-full">
            <div className="w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between mx-auto">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="/" className="hover:underline">Instant News</a>. All Rights Reserved.</span>
            </div>
        </footer>
    );
};

export default BackendFooter;
