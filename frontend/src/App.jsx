import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup';

function App() {
  const [view, setView] = useState('login');
  const router = createBrowserRouter([
    { 
      path: '/', element: <Dashboard/>
    },
    { 
      path: '/login', element: <Login/>
    },
    { 
      path: '/signup', element: <Signup/>
    }
  ]);
  return (
    <>
    <RouterProvider router={router} />
    <Navbar setView={setView} />
    </>
  )
}

export default App
