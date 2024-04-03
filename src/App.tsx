import React, { useEffect, useState } from 'react';
import { BrowserRouter as Routers, Route, Navigate, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Dashboard from './components/backend/dashboard/Dashboard';
import PageNotFound from './components/utilities/pagenotfound/PageNotFound';
import Home from './components/frontend/layout/Home/Home';
import Layout from './components/frontend/layout/Layout';
import BackendLayout from './components/backend/layout/BackendLayout';
import BackendLogin from './components/backend/auth/BackendLogin';

//import dotenv from 'dotenv';
//dotenv.config();

function App() {

  const [loading, setLoading] = useState(true);
  const [homepageNews, setHomepageNews] = useState([]);

  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    setLoading(true);
    setLoading(false);
  })

  return (
    <BrowserRouter>
      <Routes>
        {/* Frontend Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
  
        {/* Backend Routes */}
        <Route path="backend/*" element={<BackendLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="login" element={<BackendLogin />} />
        </Route>
  
        {/* Handle 404 - Page Not Found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
  
}

export default App;
