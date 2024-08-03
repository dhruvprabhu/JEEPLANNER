import React, { useState } from 'react';
import { Typography, TextField, Button, Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

const RegisterForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [emailFormatError, setEmailFormatError] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailFormatError(true);
      return; // Exit function if email format is invalid
    }

    // Validate password match
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
    } else {
      // Reset error states
      setPasswordMatchError(false);
      setEmailFormatError(false);
      try {
        // Send registration data to the backend
        const response = await axios.post(`${process.env.REACT_APP_API_AUTH_URL}/register`, {
          username,
          email,
          password,
        });
        console.log('Registration successful:', response.data);
        // Call parent component onSubmit function with form data
        onSubmit({ username, email, password });
      } catch (error) {
        console.error('Error during registration:', error.response?.data);
        setRegistrationError(error.response?.data?.message || 'Registration failed');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Box component="form" onSubmit={handleFormSubmit}>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={emailFormatError}
        helperText={emailFormatError ? "Invalid email format" : ''}
      />
      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={togglePasswordVisibility}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Confirm Password"
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={passwordMatchError}
        helperText={passwordMatchError ? "Passwords don't match" : ''}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={togglePasswordVisibility}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {registrationError && (
        <Typography color="error" variant="body2">
          {registrationError}
        </Typography>
      )}
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterForm;
