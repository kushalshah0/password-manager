import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { styles } from '../../styles/style'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import Dashboard from '../Dashboard/Dashboard'
import { StatesContext } from '../../context/states.jsx'
import axios from 'axios'
import toast from 'react-hot-toast'

const Navbar = () => {
  const { URL, view, setView, user, setUser, formState, setFormState, errors, setErrors, showAddPassword, setShowAddPassword, setAllPasswordData } = useContext(StatesContext);

  const handleAddClick = () => {
    setShowAddPassword(!showAddPassword);
  };

  const handleNavClick = (targetView) => {
    setView(targetView);
    setFormState({});
  }

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${URL}/api/user/logout`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.success) {
        localStorage.clear();
        setUser(null);
        setView('login');
        setFormState({});
        setErrors({});
        setAllPasswordData([]);
        setShowAddPassword(false);
        toast.success(response.data.message);
      } else {
        console.error('Logout failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  return (
    <>
      <div style={styles.root}>
        <header style={styles.header}>
          <div style={styles.logo} aria-label="Password Manager Logo" tabIndex={0}>
            PassManager
          </div>
          <nav aria-label="Main Navigation" style={styles.nav}>
            {(view === 'login' || view === 'signup') && (
              <>
                <Link to="/login">
                  <button
                    type="button"
                    style={styles.navButton(view === 'login')}
                    aria-current={view === 'login' ? 'page' : undefined}
                    onClick={() => handleNavClick('login')}
                  >
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button
                    type="button"
                    style={styles.navButton(view === 'signup')}
                    aria-current={view === 'signup' ? 'page' : undefined}
                    onClick={() => handleNavClick('signup')}
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
            {view === 'dashboard' && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {!showAddPassword && (
                    <button
                      style={{
                        ...styles.addCardButton,
                        background: '#fff',
                        color: '#000',
                        border: '1px solid #d1d5db',
                        alignSelf: 'center',
                        cursor: 'pointer',
                        fontSize: '1.5rem',
                        padding: '0.2rem 0.7rem',
                      }}
                      onClick={handleAddClick}
                      aria-label={showAddPassword ? "Hide Add Password Form" : "Show Add Password Form"}
                    >
                      +
                    </button>
                  )}
                  <Link to="/login">
                    <button
                      type="button"
                      style={{
                        ...styles.navButton(true),
                        color: '#fff',
                        boxShadow: 'none',
                        padding: '0.55rem 1rem',
                      }}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </Link>
                </div>
              </>
            )}
          </nav>
        </header>
        <section>
          {view === 'login' && <Login />}
          {view === 'signup' && <Signup />}
          {view === 'dashboard' && <Dashboard />}
        </section>
      </div>
    </>
  )
}
export default Navbar