import React, { useState } from 'react';
import AuthCard from './AuthCard';
import { Box, Button, Modal, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RegisterForm from './RegisterForm';

const Auth = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleRegisterClick = () => {
    setIsRegisterOpen(true);
  };

  const handleCloseRegister = () => {
    setIsRegisterOpen(false);
  };

  const handleRegisterSubmit = ({ username, email, password }) => {
    // Implement your registration logic here
    console.log('Registering...', { username, email, password });
    // Reset fields and close modal
    setIsRegisterOpen(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      px={5}
    >
      {/* Your existing content */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        mb={4}
      >
        {/* Left content */}
        <Box flexGrow={1} display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start" px={5} style={{ marginTop: '-100px' }}>
          <Typography variant="h1" style={{ color: 'white', fontFamily: '"Poppins", sans-serif', fontWeight: 700, fontSize: '120px', maxWidth: '70px' }}>
            JEE PLANNER
          </Typography>
          <Typography variant="body1" style={{ color: 'white', fontFamily: '"Poppins", sans-serif', marginTop: '20px', maxWidth: '700px', fontWeight: 200 }}>
            Welcome to the ultimate task management app! Stay organized, stay motivated, and conquer your JEE journey with ease. Our platform is designed to help you track your progress, manage your study schedule, and achieve your academic goals. Let's make your JEE preparation fun, engaging, and super productive!
          </Typography>
          <Typography variant="h6" style={{ color: 'white', marginTop: '20px', fontFamily: '"Poppins", sans-serif' }}>
            New User? Register below
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleRegisterClick}
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              textTransform: 'none',
              marginTop: '10px',
              color: 'white', // White text color
              borderColor: 'white', // White border color
            }}
          >
            Register
          </Button>
        </Box>

        {/* Right content */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <AuthCard />
        </Box>
      </Box>

      {/* Register Modal */}
      <Modal
        open={isRegisterOpen}
        onClose={handleCloseRegister}
        aria-labelledby="register-modal"
        aria-describedby="register-modal-description"
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
            <Box display="flex" justifyContent="flex-end">
              <IconButton
                onClick={handleCloseRegister}
                sx={{ position: 'absolute', top: 8, right: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography variant="h4" style={{ textAlign: 'center', fontFamily: '"Poppins", sans-serif', fontWeight: 500}}>
              Register
            </Typography>
            <RegisterForm onSubmit={handleRegisterSubmit} />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Auth;
