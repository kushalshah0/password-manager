import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { styles } from '../../styles/style';
import { StatesContext } from '../../context/states';
import axios from 'axios';

const Signup = () => {
  const { URL, view, setView, user, setUser, formState, setFormState, errors, setErrors } = useContext(StatesContext);
  const navigate = useNavigate();
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

  const handleSignup = async (e) => {
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
    await axios.post(`${URL}/api/user/signup`, newUser, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.data.success) {
          setView('login');
          navigate('/login');
          setFormState({});
        }
      })
      .catch((error) => {
        console.log(URL);
        console.error('Error signing up user:', error);
        setErrors(error.message);
        if (error.response && error.response.status === 409) {
          setErrors({ email: 'Email already exists.' });
        } else {
          setErrors({ general: 'An error occurred. Please try again later.' });
        }
      });
  }


  return (
    <div style={styles.cusContainer}>
      <form onSubmit={handleSignup} aria-label="Sign up form" style={styles.form} noValidate>
        <h2 style={styles.formHeading}>Sign Up</h2>

        <label htmlFor="signup-name" style={styles.label}>
          Name
        </label>
        <input
          id="signup-name"
          type="text"
          name="name"
          value={formState.name || ''}
          onChange={handleInputChange}
          autoComplete="name"
          required
          style={styles.input}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'signup-name-error' : undefined}
        />
        {errors.username && (
          <div id="signup-name-error" style={styles.errorText} role="alert">
            {errors.name}
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
