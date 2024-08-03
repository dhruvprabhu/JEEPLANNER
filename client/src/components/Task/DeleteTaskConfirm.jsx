import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../features/tasks/tasksSlice';

const DeleteTaskConfirm = ({ taskId, category, onDeleteConfirm, onCancel }) => {
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    dispatch(deleteTask({ id: taskId, category }))
      .then(() => {
        onDeleteConfirm();
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <Card sx={{ width: 414, borderRadius: 4, background: '#FAFAFA', boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.25)' }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontFamily: 'sans-serif', fontWeight: 600, color: '#263238', marginBottom: 3, textAlign: 'center' }}>
            Do you want to delete this task?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteTask}
              sx={{
                width: 150,
                padding: '11px 0',
                borderRadius: 12,
                background: '#d32f2f',
                fontFamily: 'Lato',
                '&:hover': {
                  backgroundColor: '#b71c1c',
                },
              }}
            >
              Delete Task
            </Button>
            <Button
              variant="contained"
              onClick={onCancel}
              sx={{
                width: 150,
                padding: '11px 0',
                borderRadius: 12,
                fontFamily: 'Lato',
              }}
            >
              Cancel
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DeleteTaskConfirm;
