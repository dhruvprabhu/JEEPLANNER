import React, { useState } from 'react';
import { Box, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddTask = ({ onClose, onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState(false);

  const handleAdd = () => {
    if (!taskName.trim() || !priority) {
      setError(true);
      return;
    }
    onAddTask({ task: taskName, priority, deadline });
    setTaskName('');
    setPriority('');
    setDeadline('');
    setError(false);
  };

  return (
    <Box sx={{ 
      position: 'fixed', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)', 
      width: 414, 
      bgcolor: 'background.paper', 
      p: 4, 
      boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.25)', 
      borderRadius: 2, 
      zIndex: 1300 
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h5" sx={{ fontFamily: 'sans-serif', fontWeight: 600, color: '#263238', marginBottom: 3, textAlign: 'center' }}>
          Add Task
        </Typography>
        <CloseIcon onClick={onClose} sx={{ cursor: 'pointer', marginTop: -3 }} />
      </Box>
      <TextField
        fullWidth
        label="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        required
        error={error && !taskName.trim()}
        helperText={error && !taskName.trim() ? "Task name is required" : ""}
        sx={{ marginBottom: 2 }}
      />
      <FormControl fullWidth required sx={{ marginBottom: 2 }}>
        <InputLabel>Priority</InputLabel>
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          label="Priority"
          required
          error={error && !priority}
        >
          <MenuItem value="high">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 12, height: 12, bgcolor: '#FF0013', borderRadius: '50%', marginRight: 1 }} />
              High
            </Box>
          </MenuItem>
          <MenuItem value="medium">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 12, height: 12, bgcolor: '#FFF000', borderRadius: '50%', marginRight: 1 }} />
              Medium
            </Box>
          </MenuItem>
          <MenuItem value="low">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 12, height: 12, bgcolor: '#00CDFF', borderRadius: '50%', marginRight: 1 }} />
              Low
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Deadline"
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ marginBottom: 2 }}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleAdd} 
        fullWidth
        sx={{
          display: 'flex',
          width: 200,
          marginLeft: 13,
          padding: '11px 0',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 12,
          background: '#263238',
          '&:hover': {
                backgroundColor: '#50C878',
          },
        }}
      >
        Add Task
      </Button>
    </Box>
  );
};

export default AddTask;
