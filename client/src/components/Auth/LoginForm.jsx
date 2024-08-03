import React, { useState } from 'react';
import { TextField, Button, Box, IconButton, InputAdornment, MenuItem, Select, FormControl, InputLabel, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ handleForgotPasswordClick }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedOption, setSelectedOption] = useState('username');
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [emailFormatError, setEmailFormatError] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setEmailFormatError(false);

    if (selectedOption === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+$/;
      if (!emailRegex.test(usernameOrEmail)) {
        setEmailFormatError(true);
        return;
      }
    }

    const loginData = {
      username: selectedOption === 'username' ? usernameOrEmail : '',
      email: selectedOption === 'email' ? usernameOrEmail : '',
      password: password,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_AUTH_URL}/login`, loginData);
      const { accessToken, refreshToken } = response.data; // Assume the response includes both tokens
      localStorage.setItem('accessToken', accessToken); // Store access token
      localStorage.setItem('refreshToken', refreshToken); // Store refresh token
      navigate('/dashboard'); // Redirect to main JEE planner page after successful login
    } catch (error) {
      console.error('Error logging in:', error.response?.data);
      setLoginError(error.response?.data?.message || 'An unexpected error occurred.');
    }
  };

  return (
    <Box component="form" onSubmit={handleFormSubmit}>
      {loginError && (
        <Alert severity="error" style={{ marginBottom: '16px' }}>
          {loginError}
        </Alert>
      )}
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel id="select-label">Login with</InputLabel>
        <Select
          labelId="select-label"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          label="Login with"
        >
          <MenuItem value="username">Username</MenuItem>
          <MenuItem value="email">Email</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label={selectedOption === 'username' ? 'Username' : 'Email'}
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={usernameOrEmail}
        onChange={(e) => setUsernameOrEmail(e.target.value)}
        error={selectedOption === 'email' && emailFormatError}
        helperText={selectedOption === 'email' && emailFormatError ? 'Invalid email format' : ''}
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
              <IconButton onClick={togglePasswordVisibility} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Box width="100%" display="flex" justifyContent="center">
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Login
        </Button>
      </Box>
      <Box width="100%" display="flex" justifyContent="center">
        <Button variant="text" color="primary" onClick={handleForgotPasswordClick} style={{ marginTop: '20px' }}>
          Forgot Password?
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
