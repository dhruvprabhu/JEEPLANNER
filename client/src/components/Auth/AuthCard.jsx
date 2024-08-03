import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, Modal, IconButton, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthCard = ({ isRegister, handleCloseRegister }) => {
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleForgotPasswordClick = () => {
    setIsForgotPasswordOpen(true);
  };

  const handleCloseForgotPassword = () => {
    setIsForgotPasswordOpen(false);
    setEmail('');
    setEmailError('');
    setSubmitMessage('');
  };

  const handleForgotPasswordSubmit = async (event) => {
    event.preventDefault();
    setEmailError('');
    setSubmitMessage('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_AUTH_URL}/forgot-password`, { email });
      setSubmitMessage(response.data.message);
    } catch (error) {
      console.error('Error sending reset email:', error.response?.data);
      setEmailError(error.response?.data?.message || 'An unexpected error occurred.');
    }
  };

  return (
    <Card style={{ width: '400px', height: '480px', position: 'relative' }}>
      {isRegister && (
        <IconButton
          onClick={handleCloseRegister}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
      )}
      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom style={{ fontFamily: '"Poppins", sans-serif', fontWeight: 500 }}>
          {isRegister ? 'Register' : 'Login'}
        </Typography>
        {isRegister ? <RegisterForm /> : <LoginForm handleForgotPasswordClick={handleForgotPasswordClick} />}
      </CardContent>
      
      {/* Forgot Password Modal */}
      <Modal
        open={isForgotPasswordOpen}
        onClose={handleCloseForgotPassword}
        aria-labelledby="forgot-password-modal"
        aria-describedby="forgot-password-modal-description"
      >
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
            <IconButton
              onClick={handleCloseForgotPassword}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h5" component="h2" gutterBottom style={{ fontFamily: '"Poppins", sans-serif', textAlign: 'center' }}>
              Please provide your Email ID
            </Typography>
            <form onSubmit={handleForgotPasswordSubmit}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
              />
              <Box width="100%" display="flex" justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '16px' }}
                >
                  Submit
                </Button>
              </Box>
              {submitMessage && (
                <Box width="100%" display="flex" justifyContent="center" marginTop="16px">
                  <Alert severity="success">{submitMessage}</Alert>
                </Box>
              )}
            </form>
          </Box>
        </Box>
      </Modal>
    </Card>
  );
};

export default AuthCard;
