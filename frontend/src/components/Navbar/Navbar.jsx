import React from 'react'
import { useState } from 'react'
import { styles } from '../../styles/style'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import Dashboard from '../Dashboard/Dashboard'

const Navbar = () => {
  const [view, setView] = useState('signup');
  const [formState, setFormState] = useState({});
  const handleNavClick = (targetView) => {
    setView(targetView);
    setFormState({});
  }
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return (
    <div style={styles.root}>
      <header style={styles.header}>
        <div style={styles.logo} aria-label="Password Manager Logo" tabIndex={0}>
          PassManager
        </div>
        <nav aria-label="Main Navigation" style={styles.nav}>
          <button
            type="button"
            style={styles.navButton(view === 'login')}
            aria-current={view === 'login' ? 'page' : undefined}
            onClick={() => handleNavClick('login')}
          >
            Login
          </button>
          <button
            type="button"
            style={styles.navButton(view === 'signup')}
            aria-current={view === 'signup' ? 'page' : undefined}
            onClick={() => handleNavClick('signup')}
          >
            Sign Up
          </button>
          {currentUser && (
            <button
              type="button"
              style={styles.navButton(view === 'dashboard')}
              aria-current={view === 'dashboard' ? 'page' : undefined}
              onClick={() => handleNavClick('dashboard')}
            >
              Dashboard
            </button>
          )}
          {currentUser && (
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
          )}
        </nav>
      </header>
      <section>
        {view === 'login' && <Login setView={setView} setFormState={setFormState} />}
        {view === 'signup' && <Signup setView={setView} setFormState={setFormState} />}
        {view === 'dashboard' && <Dashboard />}
      </section>
    </div>
  )
}

export default Navbar