import React, { useContext } from 'react';
import { styles } from '../../styles/style';
import { StatesContext } from '../../context/states';

const Signup = () => {
  const { view, setView, users, setUsers, formState, setFormState, errors, setErrors } = useContext(StatesContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => {
      const updatedForm = { ...prev, [name]: value };
      if ((name === 'password' && updatedForm.passwordConfirm?.length > 0) ||
        (name === 'passwordConfirm' && updatedForm.password?.length > 0)) {
        if (updatedForm.password !== updatedForm.passwordConfirm) {
          setErrors((prevErrors) => ({ ...prevErrors, passwordConfirm: 'Passwords do not match.' }));
        } else {
          setErrors((prevErrors) => {
            const { passwordConfirm, ...rest } = prevErrors;
            return rest;
          });
        }
      } else {
        setErrors({});
      }
      return updatedForm;
    });
    console.log(formState);
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSignup = (e) => {
    e.preventDefault();
    const { name = '', email = '', password = '', passwordConfirm = '' } = formState;
    let newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Name is required.';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    }
    else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format.';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const emailLower = email.toLowerCase();
    const newUser = {
      name,
      email: emailLower,
      password
    };
    setUsers((prev) => ({ ...prev, [emailLower]: newUser }));
    setView('dashboard');
    setFormState({});
  }


  return (
    <div style={styles.cusContainer}>
      <form onSubmit={handleSignup} aria-label="Sign up form" style={styles.form} noValidate>
        <h2 style={styles.formHeading}>Sign Up</h2>

        <label htmlFor="signup-username" style={styles.label}>
          Name
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
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default Signup
