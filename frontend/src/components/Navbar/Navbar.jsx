import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { styles } from '../../styles/style'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import Dashboard from '../Dashboard/Dashboard'
import { StatesContext } from '../../context/states.jsx'

const Navbar = () => {
  const { view, setView, users, setUsers, formState, setFormState, errors, setErrors } = useContext(StatesContext);
  const handleNavClick = (targetView) => {
    setView(targetView);
    setFormState({});
  }
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return (
    <>
      <div style={styles.root}>
        <header style={styles.header}>
          <div style={styles.logo} aria-label="Password Manager Logo" tabIndex={0}>
            PassManager
          </div>
          <nav aria-label="Main Navigation" style={styles.nav}>
            <Link to="/login" style={styles.navLink}>
            <button
              type="button"
              style={styles.navButton(view === 'login')}
              aria-current={view === 'login' ? 'page' : undefined}
              onClick={() => handleNavClick('login')}
            >
              Login
            </button>
            </Link>
            <Link to="/signup" style={styles.navLink}>
            <button
              type="button"
              style={styles.navButton(view === 'signup')}
              aria-current={view === 'signup' ? 'page' : undefined}
              onClick={() => handleNavClick('signup')}
            >
              Sign Up
            </button>
            </Link>
            {currentUser && (
              <Link to="/dashboard" style={styles.navLink}>
              <button
                type="button"
                style={styles.navButton(view === 'dashboard')}
                aria-current={view === 'dashboard' ? 'page' : undefined}
                onClick={() => handleNavClick('dashboard')}
              >
                Dashboard
              </button>
              </Link>
            )}
            {currentUser && (
              <Link to="/login" style={styles.navLink}>
              <button
                type="button"
                style={{
                  ...styles.navButton(false),
                  color: '#dc2626',
                  boxShadow: 'none',
                  paddingLeft: '1rem',
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
              </Link>
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