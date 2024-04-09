import React, { useEffect, useState } from 'react';
import { BrowserRouter as Routers, Route, Navigate, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Dashboard from './components/backend/dashboard/Dashboard';
import PageNotFound from './components/utilities/pagenotfound/PageNotFound';
import HomePage from './components/frontend/layout/Home/HomePage';
import Layout from './components/frontend/layout/Layout';
import BackendLayout from './components/backend/layout/BackendLayout';
import BackendLogin from './components/backend/auth/BackendLogin';
import UserDashboard from './components/backend/users/UserDashboard';
import AddUser from './components/backend/users/AddUser';
import CategoryDashboard from './components/backend/categories/CategoryDashboard';
import AddCategory from './components/backend/categories/AddCategory';
import NewsDashboard from './components/backend/news/NewsDashboard';
import AddNews from './components/backend/news/AddNews';
import News from './components/frontend/layout/News/News';

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
          <Route index element={<HomePage />} />
          <Route path="/news/:newId" element={<News />} />
        </Route>
  
        {/* Backend Routes */}
        <Route path="backend" element={<BackendLayout />}>
          <Route path="login" element={<BackendLogin />} />
          <Route index element={<Dashboard />} />

          <Route path="user" element={<UserDashboard />} />
          <Route path="user/adduser" element={<AddUser />} />

          <Route path="category" element={<CategoryDashboard />} />
          <Route path="category/addcategory" element={<AddCategory />} />

          <Route path="news" element={<NewsDashboard />} />
          <Route path="news/addnews" element={<AddNews />} />

        </Route>
  
        {/* Handle 404 - Page Not Found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
  
}

export default App;
