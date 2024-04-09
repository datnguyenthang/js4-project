import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-300 text-gray-700 fixed bottom-0 w-full">
            <div className="container mx-auto py-1 flex items-center justify-between">
                <a href="/" className="text-emerald-400 font-semibold">Instants News</a>
                <span className="ml-2 text-sm text-gray-500">
                    This project is used only for Academic at Fanshawe College, designed and developed by Group #60 - INFO-5143-(02)-24W
                </span>
            </div>
        </footer>
    );
};

export default Footer;
