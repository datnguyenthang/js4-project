import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import Header from '../../frontend/layout/Header/Header';
import Footer from '../../frontend/layout/Footer/Footer';

const PageNotFound = () => {
    return (
        <div>
            <Header />
            <div className="text-center">
                <img src="error.svg" alt="Page Not Found" className="w-32 h-32 mx-auto mb-8 animate-bounce" style={{ animationDuration: "1.5s", animationIterationCount: "infinite" }} />
                <h1 className="text-4xl font-bold text-red-800 mb-4">404 - Page Not Found</h1>
                <p className="text-lg text-orange-600 mb-8">The page you are looking for might have been removed or doesn't exist.</p>
                <a href="/" className="text-blue-600 hover:underline">Go back to homepage</a>
            </div>
            <Footer />
        </div>
    );
};

export default PageNotFound;