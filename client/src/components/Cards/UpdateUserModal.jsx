import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton, FormHelperText, InputAdornment, IconButton as MUIIconButton, Snackbar, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../features/user/userSlice'; // Adjust the import path as needed

const UpdateUserModal = ({ open, onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [emailFormatError, setEmailFormatError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailFormatError(true);
      return; // Exit function if email format is invalid
    }

    setError(''); // Clear previous errors
    setEmailFormatError(false); // Clear email format error

    const userData = {
      username,
      email,
      password,
    };

    dispatch(updateUser(userData))
      .then(() => {
        setSnackbarOpen(true);
        onClose();
      })
      .catch((error) => {
        // Handle error
        console.error('Error updating user:', error);
        setError('Failed to update user');
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="update-user-modal-title"
        aria-describedby="update-user-modal-description"
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
            position: 'relative',
            textAlign: 'center',
          }}
        >
          <IconButton
            sx={{ position: 'absolute', top: 8, right: 8 }}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" id="update-user-modal-title" sx={{ mb: 2 }}>
            Update User
          </Typography>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            error={emailFormatError} // Show error state
            helperText={emailFormatError ? 'Invalid email format' : ''}
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <MUIIconButton
                    edge="end"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </MUIIconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <MUIIconButton
                    edge="end"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </MUIIconButton>
                </InputAdornment>
              ),
            }}
          />
          {error && (
            <FormHelperText error sx={{ mb: 2 }}>
              {error}
            </FormHelperText>
          )}
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="User updated successfully!"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          User updated successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default UpdateUserModal;
