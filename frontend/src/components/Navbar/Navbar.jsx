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
  const handleLogout = () => {
    setView('login');
    setFormState({});
    setErrors({});
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