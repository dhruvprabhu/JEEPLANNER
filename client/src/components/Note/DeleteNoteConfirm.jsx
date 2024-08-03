// DeleteNoteConfirm.jsx
import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';


const DeleteNoteConfirm = ({ note, onDelete, onCancel }) => {
  if (!note) return null;

  return (
    <Card sx={{ width: 414, borderRadius: 2, background: '#FAFAFA', boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.25)' }}>
      <CardContent>
        <Typography variant="body1" sx={{ fontFamily: 'Lato', color: '#263238', marginBottom: 3, textAlign: 'center' }}>
          Are you sure you want to delete this note?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            onClick={onDelete}
            sx={{
              display: 'flex',
              padding: '11px 20px',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
              background: '#D32F2F',
              fontFamily: 'Lato',
              '&:hover': {
                backgroundColor: '#C62828',
              },
            }}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            onClick={onCancel}
            sx={{
              display: 'flex',
              padding: '11px 20px',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
              fontFamily: 'Lato',
            }}
          >
            Cancel
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DeleteNoteConfirm;
