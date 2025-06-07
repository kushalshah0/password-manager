import React, { useState, useEffect } from 'react';

const styles = {
  root: {
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: '#ffffff',
    color: '#374151',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    maxWidth: '1200px',
    width: '100%',
    padding: '0 1.5rem',
    margin: '0 auto',
    flexGrow: 1,
    marginTop: '72px', // header height
  },
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '72px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
    zIndex: 1000,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  logo: {
    fontWeight: 700,
    fontSize: '1.5rem',
    color: '#111827',
    letterSpacing: '0.05em',
    userSelect: 'none',
  },
  nav: {
    display: 'flex',
    gap: '1.5rem',
  },
  navButton: (active) => ({
    background: 'none',
    border: 'none',
    fontWeight: 600,
    fontSize: '1rem',
    color: active ? '#3b82f6' : '#6b7280',
    cursor: 'pointer',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.75rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: active ? '0 0 8px rgba(59,130,246,0.3)' : 'none',
  }),
  form: {
    backgroundColor: '#ffffff',
    padding: '2rem 2rem 2.5rem',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginTop: '3rem',
    maxWidth: '500px',
    width: '100%',
  },
  formHeading: {
    fontWeight: 700,
    fontSize: '2rem',
    margin: 0,
    color: '#111827',
  },
  label: {
    fontWeight: 600,
    fontSize: '0.9rem',
    color: '#6b7280',
    marginBottom: '0.25rem',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '0.6rem 0.75rem',
    fontSize: '1rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.75rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily: 'inherit',
    color: '#374151',
    outlineOffset: '2px',
  },
  inputFocus: {
    borderColor: '#3b82f6',
    boxShadow: '0 0 5px #3b82f6',
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    fontWeight: 700,
    fontSize: '1rem',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(59,130,246,0.4)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  submitButtonHover: {
    backgroundColor: '#2563eb',
    boxShadow: '0 6px 12px rgba(37,99,235,0.6)',
  },
  dashboard: {
    marginTop: '3rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    maxWidth: '700px',
    width: '100%',
  },
  greeting: {
    fontWeight: 800,
    fontSize: '2.5rem',
    color: '#111827',
    marginBottom: '1rem',
    userSelect: 'none',
  },
  passwordsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  passwordCard: {
    backgroundColor: '#f9fafb',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    padding: '1rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'default',
  },
  passwordCardHover: {
    boxShadow: '0 6px 15px rgba(0, 131, 255, 0.15)',
    transform: 'translateY(-2px)',
  },
  passwordInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    maxWidth: '70%',
    overflowWrap: 'anywhere',
  },
  site: {
    fontWeight: 700,
    fontSize: '1.125rem',
    color: '#111827',
  },
  usernameText: {
    fontSize: '0.9rem',
    color: '#6b7280',
  },
  passwordText: {
    fontFamily: 'monospace',
    fontSize: '1rem',
    color: '#6366f1',
    letterSpacing: '0.05em',
  },
  errorText: {
    color: '#dc2626',
    fontSize: '0.875rem',
    marginTop: '-1rem',
    marginBottom: '1rem',
  },
  footer: {
    textAlign: 'center',
    padding: '1rem 0',
    fontSize: '0.85rem',
    color: '#9ca3af',
  },
};

function PasswordCard({ site, username, password }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      tabIndex={0}
      role="listitem"
      style={{
        ...styles.passwordCard,
        ...(hovered ? styles.passwordCardHover : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.passwordInfo}>
        <div style={styles.site}>{site}</div>
        <div style={styles.usernameText}>{username}</div>
        <div style={styles.passwordText} aria-label="Password">
          {password}
        </div>
      </div>
    </div>
  );
}

export default function PasswordManager() {
  // Views: login, signup, dashboard
  const [view, setView] = useState('login');
  const [users, setUsers] = useState({});
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [formState, setFormState] = useState({});
  const [errors, setErrors] = useState({});

  // Load users and currentUser from localStorage on mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
    setUsers(storedUsers);
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
    if (currentUser) {
      setCurrentUserEmail(currentUser.email);
      setView('dashboard');
    }
  }, []);

  // Save users to localStorage on users state change
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // Save currentUser to sessionStorage on change
  useEffect(() => {
    if (currentUserEmail) {
      sessionStorage.setItem('currentUser', JSON.stringify(users[currentUserEmail]));
    } else {
      sessionStorage.removeItem('currentUser');
    }
  }, [currentUserEmail, users]);

  const currentUser = currentUserEmail ? users[currentUserEmail] : null;

  // Handle input change for forms
  function handleInputChange(e) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors({});
  }

  // Navigation handlers
  function handleNavClick(targetView) {
    setView(targetView);
    setFormState({});
    setErrors({});
  }

  // Signup form submit handler
  function handleSignup(e) {
    e.preventDefault();
    const { username = '', email = '', password = '', passwordConfirm = '' } = formState;
    let newErrors = {};
    if (username.trim().length < 3) {
      newErrors.username = 'Username should be at least 3 characters.';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      newErrors.email = 'Email format is invalid.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    }
    if (password !== passwordConfirm) {
      newErrors.passwordConfirm = 'Passwords do not match.';
    }
    if (email && users[email.trim().toLowerCase()]) {
      newErrors.email = 'An account with this email already exists.';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const emailLower = email.trim().toLowerCase();
    // Add user with example passwords
    const newUser = {
      username: username.trim(),
      email: emailLower,
      password,
      passwords: [
        { site: 'Example.com', username: 'user123', password: 'p@ssw0rd!' },
        { site: 'MyBank', username: 'user_bank', password: 'secure1234' },
      ],
    };
    setUsers((prev) => ({ ...prev, [emailLower]: newUser }));
    setCurrentUserEmail(emailLower);
    setView('dashboard');
    setFormState({});
  }

  // Login form submit handler
  function handleLogin(e) {
    e.preventDefault();
    const { email = '', password = '' } = formState;
    let newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const emailLower = email.trim().toLowerCase();
    if (!users[emailLower]) {
      setErrors({ email: 'No account found with this email.' });
      return;
    }
    if (users[emailLower].password !== password) {
      setErrors({ password: 'Incorrect password.' });
      return;
    }
    setCurrentUserEmail(emailLower);
    setView('dashboard');
    setFormState({});
  }

  // Logout handler
  function handleLogout() {
    setCurrentUserEmail(null);
    setView('login');
    setFormState({});
    setErrors({});
  }

  return (
    <div style={styles.root}>
      <header style={styles.header}>
        <div style={styles.logo} aria-label="Password Manager Logo" tabIndex={0}>
          PassKeep
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
      <footer style={styles.footer}>
        © {new Date().getFullYear()} PassKeep — Simple Password Manager
      </footer>
    </div>
  );
}

