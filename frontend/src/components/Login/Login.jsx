import React, { useContext } from 'react'
import { styles } from '../../styles/style'
import axios from 'axios';
import { StatesContext } from '../../context/states';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Login = () => {
  const { URL, view, setView, user, setUser, formState, setFormState, errors, setErrors } = useContext(StatesContext);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prevErrors) => {
        const { [name]: removed, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email = '', password = '' } = formState;
    let newErrors = {};
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
    const user = {
      email: emailLower,
      password
    };

    const loadingToastId = toast.loading('Logging in...');

    try {
      const res = await axios.post(`${URL}/api/user/login`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      toast.dismiss(loadingToastId);
      if (res.data.success) {
        localStorage.setItem('token', res.data.user.refreshToken);
        localStorage.setItem('name', res.data.user.name.split(' ')[0]);
        setUser({
          name: res.data.user.name,
        });
        setView('dashboard');
        navigate('/dashboard');
        setFormState({});
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.dismiss(loadingToastId);
      if (error.response.data.success === false) {
        toast.error(error.response.data.message);
        navigate('/login');
      } else {
        setErrors({ general: 'An error occurred. Please try again later.' });
      }
    }
  }

  return (
    <>
      <div style={styles.cusContainer}>
        <form onSubmit={handleLogin} aria-label="Login form" style={{
          ...styles.form,
          marginTop: '9rem',
        }} noValidate>
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
          >
            Log In
          </button>
        </form>
      </div>
    </>
  )
}

export default Login
