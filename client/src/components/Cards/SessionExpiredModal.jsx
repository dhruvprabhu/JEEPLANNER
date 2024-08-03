import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SessionExpiredModal = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/auth');
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="session-expired-modal-title"
      aria-describedby="session-expired-modal-description"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
          outline: 'none',
          width: 400,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" id="session-expired-modal-title" sx={{ fontFamily: '"Poppins", sans-serif', fontWeight: 600, color: '#263238', textAlign: 'center' }}>
          Session Expired, Please Log In again!
        </Typography>
        
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleLoginRedirect}
        >
          LOG IN
        </Button>
      </Box>
    </Modal>
  );
};

export default SessionExpiredModal;
