import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, TextField, Button, Typography, MenuItem } from '@mui/material';

const EditTask = ({ task, onClose, onEditTask }) => {
  const [editedTask, setEditedTask] = useState(task.task);
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const [editedDeadline, setEditedDeadline] = useState(task.deadline);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!editedTask.trim()) {
      setError('Task field cannot be empty');
      return;
    }

    const updatedTask = { 
      id: task.id, 
      task: editedTask, 
      priority: editedPriority, 
      deadline: editedDeadline,
      category: task.category,
    };

    if (typeof onEditTask === 'function') {
      onEditTask(updatedTask);
    }

    onClose();
  };

  return (
    <Modal open onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Edit Task
        </Typography>
        <TextField
          label="Task"
          value={editedTask}
          onChange={(e) => {
            setEditedTask(e.target.value);
            if (e.target.value.trim()) {
              setError('');
            }
          }}
          fullWidth
          sx={{ mb: 2 }}
          error={!!error}
          helperText={error}
        />
        <TextField
          label="Priority"
          select
          value={editedPriority}
          onChange={(e) => setEditedPriority(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="low">Low</MenuItem>
        </TextField>
        <TextField
          label="Deadline"
          type="date"
          value={editedDeadline ? editedDeadline.split('T')[0] : ''}
          onChange={(e) => setEditedDeadline(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave} sx={{ mr: 2 }}>
            Save
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

EditTask.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    task: PropTypes.string.isRequired,
    priority: PropTypes.oneOf(['high', 'medium', 'low']).isRequired,
    deadline: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
};

export default EditTask;
