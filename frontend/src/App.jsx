import { useState, useContext } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup';
import { Toaster } from 'react-hot-toast';

function App() {
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
      <Toaster/>
    </>
  )
}

export default App
