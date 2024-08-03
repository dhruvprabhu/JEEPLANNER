import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box, IconButton, InputAdornment, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

const ResetPassword = () => {
  const { userId, token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_AUTH_URL}/reset-pass/${userId}/${token}`, { newPassword });
      setSuccessMessage(response.data.message);
      setTimeout(() => {
        navigate('/auth');
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Error resetting password:', error.response?.data);
      setError(error.response?.data?.message || 'An unexpected error occurred.');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        p={4}
        bgcolor="background.paper"
        borderRadius={3}
        boxShadow={24}
        position="relative"
        maxWidth={400}
        width="100%"
      >
        <Typography variant="h5" component="h2" gutterBottom style={{ fontFamily: '"Poppins", sans-serif', textAlign: 'center' }}>
          Reset Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="New Password"
            type={showNewPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleNewPasswordVisibility} edge="end">
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {error && (
            <Box width="100%" display="flex" justifyContent="center" marginTop="16px">
              <Alert severity="error">{error}</Alert>
            </Box>
          )}
          {successMessage && (
            <Box width="100%" display="flex" justifyContent="center" marginTop="16px">
              <Alert severity="success">{successMessage}</Alert>
            </Box>
          )}
          <Box width="100%" display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: '16px' }}
            >
              Reset Password
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ResetPassword;
