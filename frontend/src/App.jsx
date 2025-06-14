import { useState, useContext, useEffect } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup';
import { Toaster } from 'react-hot-toast';
import { StatesContext } from './context/states';
import { jwtDecode } from 'jwt-decode';

function App() {
  const navigate = useNavigate();
  const { setView, loading, setLoading } = useContext(StatesContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (!decoded || decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        setLoading(false);
        navigate('/login');
        return;
      }
      setLoading(false);
      setView('dashboard');
      navigate('/dashboard');
    } catch (err) {
      localStorage.removeItem('token');
      setLoading(false);
      navigate('/login');
    }
  }, [setView, setLoading]);

  if (loading) {
    return (
      <>
      </>
    );
  }

  const router = createBrowserRouter([
    {
      path: '/', element: <Navigate to="/login" replace />
    },
    {
      path: '/dashboard', element: <Dashboard />
    },
    {
      path: '/login', element: <Login />
    },
    {
      path: '/signup', element: <Signup />
    }
  ]);
  return (
    <>
      <Navbar />
      <Toaster />
    </>
  )
}

export default App
