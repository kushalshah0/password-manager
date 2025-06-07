import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { styles } from '../../styles/style'
import axios from 'axios';
import { StatesContext } from '../../context/states';
import Navbar from '../Navbar/Navbar';

const Login = () => {
  const { view, setView, users, setUsers, formState, setFormState, errors, setErrors } = useContext(StatesContext);
  const URL = import.meta.env.URL;

  const handleInputChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleNavClick = (targetView) => {
    setView(targetView);
    setFormState({});
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const { email = '', password = '' } = formState;
    let newErrors = {};
    const emailLower = email.toLowerCase();
    setView('dashboard');
    setFormState({});
  }

  return (
    <>
      <div style={styles.root}>
        <main role="main" style={styles.container}>
          {view === 'login' && (
            <form onSubmit={handleLogin} aria-label="Login form" style={styles.form} noValidate>
              <h2 style={styles.formHeading}>Login</h2>

              <label htmlFor="login-email" style={styles.label}>
                Email
              </label>
              <input
                id="login-email"
                type="email"
                name="email"
                value={formState.email || ''}
                onChange={handleInputChange}
                autoComplete="email"
                required
                style={styles.input}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'login-email-error' : undefined}
              />
              {errors.email && (
                <div id="login-email-error" style={styles.errorText} role="alert">
                  {errors.email}
                </div>
              )}

              <label htmlFor="login-password" style={styles.label}>
                Password
              </label>
              <input
                id="login-password"
                type="password"
                name="password"
                value={formState.password || ''}
                onChange={handleInputChange}
                autoComplete="current-password"
                required
                style={styles.input}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'login-password-error' : undefined}
              />
              {errors.password && (
                <div id="login-password-error" style={styles.errorText} role="alert">
                  {errors.password}
                </div>
              )}

              <button
                type="submit"
                style={styles.submitButton}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
                onFocus={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
                onBlur={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
              >
                Log In
              </button>
            </form>
          )}
        </main>
      </div>
    </>
  )
}

export default Login
