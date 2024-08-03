import React from 'react';
import { TextField, Button, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ForgotPasswordCard = ({ handleCloseForgotPassword }) => {
  return (
    <Box component="form" p={4} borderRadius={3} boxShadow={24} bgcolor="background.paper" maxWidth={400} width="100%" position="relative">
      <Typography variant="h5" component="h2" gutterBottom style={{ fontFamily: '"Poppins", sans-serif', textAlign: 'center' }}>
        Please provide your Email ID
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        required
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
     C
    </Box>
  );
};

export default ForgotPasswordCard;
