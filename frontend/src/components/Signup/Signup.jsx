import React from 'react'
import { styles } from '../../styles/style';

const Signup = () => {
  const handleSignup = (e) => {
      e.preventDefault();
      const { name = '', email = '', password = '', passwordConfirm = '' } = formState;
      let newErrors = {};
      if (password !== passwordConfirm) {
        newErrors.passwordConfirm = 'Passwords do not match.';
      }
      const emailLower = email.toLowerCase();
      const newUser = {
        name,
        email: emailLower,
        password
      };
      setUsers((prev) => ({ ...prev, [emailLower]: newUser }));
      setCurrentUserEmail(emailLower);
      setView('dashboard');
      setFormState({});
    }
  return (
    <div>
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
    </div>
  )
}

export default Signup
