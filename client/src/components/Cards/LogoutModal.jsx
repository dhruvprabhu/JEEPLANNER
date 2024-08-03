import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogoutModal = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session (implement actual logout logic here)
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    onClose();
    navigate('/auth');
  };

  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        sx={{
          width: 400,
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Do you want to logout?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogout}
          sx={{ mr: 2, mt: 2 }}
        >
          Logout
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClose}
          sx={{ mt: 2 }}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default LogoutModal;
