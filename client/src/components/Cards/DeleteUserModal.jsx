import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const DeleteUserModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      await dispatch(deleteUser()).unwrap();
      onClose();
      // Redirect to authentication page after successful deletion
      navigate('/auth');
    } catch (error) {
      console.error('Failed to delete account:', error);
    }
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
          Do you want to delete your Account?
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteAccount}
          sx={{ mr: 2, mt: 2 }}
        >
          Delete Account
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={onClose}
          sx={{ mt: 2 }}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default DeleteUserModal;
