import React from 'react'
import { useState, useEffect } from 'react'
import { styles } from '../../styles/style'
import axios from 'axios';

const Login = () => {
  const [view, setView] = useState('login');
  const [users, setUsers] = useState({});
  const [formState, setFormState] = useState({});
  const URL = import.meta.env.URL;

  const handleInputChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors({});
  }

  const handleNavClick = (targetView) => {
    setView(targetView);
    setFormState({});
    setErrors({});
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const { email = '', password = '' } = formState;
    let newErrors = {};
    const emailLower = email.toLowerCase();
    setCurrentUserEmail(emailLower);
    setView('dashboard');
    setFormState({});
  }

  return (
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

        {view === 'signup' && (
          <form onSubmit={handleSignup} aria-label="Sign up form" style={styles.form} noValidate>
            <h2 style={styles.formHeading}>Sign Up</h2>

            <label htmlFor="signup-username" style={styles.label}>
              Username
            </label>
            <input
              id="signup-username"
              type="text"
              name="username"
              value={formState.username || ''}
              onChange={handleInputChange}
              autoComplete="username"
              required
              style={styles.input}
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? 'signup-username-error' : undefined}
            />
            {errors.username && (
              <div id="signup-username-error" style={styles.errorText} role="alert">
                {errors.username}
              </div>
            )}

            <label htmlFor="signup-email" style={styles.label}>
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              name="email"
              value={formState.email || ''}
              onChange={handleInputChange}
              autoComplete="email"
              required
              style={styles.input}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'signup-email-error' : undefined}
            />
            {errors.email && (
              <div id="signup-email-error" style={styles.errorText} role="alert">
                {errors.email}
              </div>
            )}

            <label htmlFor="signup-password" style={styles.label}>
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              name="password"
              value={formState.password || ''}
              onChange={handleInputChange}
              autoComplete="new-password"
              required
              style={styles.input}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'signup-password-error' : undefined}
            />
            {errors.password && (
              <div id="signup-password-error" style={styles.errorText} role="alert">
                {errors.password}
              </div>
            )}

            <label htmlFor="signup-passwordConfirm" style={styles.label}>
              Confirm Password
            </label>
            <input
              id="signup-passwordConfirm"
              type="password"
              name="passwordConfirm"
              value={formState.passwordConfirm || ''}
              onChange={handleInputChange}
              autoComplete="new-password"
              required
              style={styles.input}
              aria-invalid={!!errors.passwordConfirm}
              aria-describedby={errors.passwordConfirm ? 'signup-passwordConfirm-error' : undefined}
            />
            {errors.passwordConfirm && (
              <div id="signup-passwordConfirm-error" style={styles.errorText} role="alert">
                {errors.passwordConfirm}
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
              Create Account
            </button>
          </form>
        )}

        {view === 'dashboard' && currentUser && (
          <section aria-label="Dashboard" style={styles.dashboard}>
            <h1 style={styles.greeting}>Hello, {currentUser.username || currentUser.email}!</h1>
            <div aria-label="Stored passwords" role="list" style={styles.passwordsList}>
              {currentUser.passwords.length === 0 ? (
                <p style={{ color: '#9ca3af' }}>No stored passwords.</p>
              ) : (
                currentUser.passwords.map(({ site, username, password }, i) => (
                  <PasswordCard key={i} site={site} username={username} password={password} />
                ))
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default Login
