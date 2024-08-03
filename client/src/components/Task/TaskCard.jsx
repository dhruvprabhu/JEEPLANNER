import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Box, IconButton, Checkbox, Dialog, DialogActions, DialogTitle, Button } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import EditTask from './EditTask';
import DeleteTaskConfirm from './DeleteTaskConfirm';
import { useDispatch } from 'react-redux';
import { updateTask, completeTask } from '../../features/tasks/tasksSlice';
import '../../styles/Fonts.css';

const getPriorityIcon = (priority) => {
  switch (priority) {
    case 'high':
      return <CircleIcon sx={{ color: '#FF0013', width: 20, height: 20 }} />;
    case 'medium':
      return <CircleIcon sx={{ color: '#FFF000', width: 20, height: 20 }} />;
    case 'low':
      return <CircleIcon sx={{ color: '#00CDFF', width: 20, height: 20 }} />;
    default:
      return null;
  }
};

const formatDate = (date) => {
  const options = { day: '2-digit', month: 'short' };
  const dateObject = new Date(date);
  const formattedDate = dateObject.toLocaleDateString('en-US', options);
  const [day, month] = formattedDate.split(' ');
  return `${day}, ${month}`;
};

const TaskCard = ({ id, task, created_at, deadline, priority, category }) => {
  const dispatch = useDispatch();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteTaskOpen, setDeleteTaskOpen] = useState(false);
  const [isCompleteDialogOpen, setCompleteDialogOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const openEditTask = () => {
    setEditModalOpen(true);
  };

  const closeEditTask = () => {
    setEditModalOpen(false);
  };

  const handleEditTask = (updatedTask) => {
    dispatch(updateTask({ id, taskData: { ...updatedTask } }));
    closeEditTask();
  };

  const openDeleteTask = () => {
    setDeleteTaskOpen(true);
  };

  const closeDeleteTask = () => {
    setDeleteTaskOpen(false);
  };

  const openCompleteDialog = () => {
    setIsChecked(true); // Set checkbox to checked when opening the dialog
    setCompleteDialogOpen(true);
  };

  const closeCompleteDialog = () => {
    setCompleteDialogOpen(false);
  };

  const handleCompleteTask = () => {
    dispatch(completeTask({ id, category }));
    closeCompleteDialog();
    setIsChecked(false); // Reset checkbox after task is completed
  };

  const handleCheckboxChange = () => {
    openCompleteDialog();
  };

  return (
    <Card
      sx={{
        width: 300,
        borderRadius: 3,
        background: '#FAFAFA',
        boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.25)',
        marginTop: 1.5,
        position: 'relative',
        '&:hover .task-card-buttons': {
          opacity: 1,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: -0.5 }}>
            <Checkbox
              size="small"
              sx={{ padding: 0, marginRight: 1 }}
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <Typography
              sx={{
                fontSize: 16,
                color: '#000',
                fontWeight: 400,
                fontFamily: '"Roboto Slab", serif',
                textAlign: 'left',
              }}
            >
              {task}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'opacity 0.3s ease',
              position: 'absolute',
              top: 0,
              right: 0,
              zIndex: 1,
              opacity: 0,
            }}
            className="task-card-buttons"
          >
            <IconButton size="small" sx={{ width: 2, height: 2, marginTop: 2, marginBottom: 2.5, marginRight: 2 }} onClick={openEditTask}>
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ width: 2, height: 2, marginRight: 2 }} onClick={openDeleteTask}>
              <DeleteOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, marginBottom: -2 }}>
          {getPriorityIcon(priority)}
          <Box
            sx={{
              width: '1.5px',
              height: '16px',
              backgroundColor: 'black',
              marginLeft: 1,
              marginRight: 1,
            }}
          />
          <CalendarMonthIcon sx={{ width: '16px', height: '16px', marginRight: 0.5 }} />
          <Typography variant="body2" sx={{ fontSize: 13, fontWeight: 400, marginLeft: 0.5, fontFamily: '"Roboto Slab", serif' }}>
            {formatDate(created_at)}
          </Typography>
          {deadline && (
            <>
              <Box
                sx={{
                  width: '1.5px',
                  height: '16px',
                  backgroundColor: 'black',
                  marginLeft: 1,
                  marginRight: 1,
                }}
              />
              <PriorityHighIcon sx={{ width: '16px', height: '16px', marginRight: 0.5 }} />
              <Typography variant="body2" sx={{ fontSize: 13, fontWeight: 400, fontFamily: '"Roboto Slab", serif' }}>
                {formatDate(deadline)}
              </Typography>
            </>
          )}
        </Box>
      </CardContent>
      {isEditModalOpen && (
        <EditTask
          task={{ id, task, priority, deadline, created_at, category }}
          onClose={closeEditTask}
          onEditTask={handleEditTask}
        />
      )}
      {isDeleteTaskOpen && (
        <DeleteTaskConfirm
          taskId={id}
          category={category}
          onDeleteConfirm={closeDeleteTask}
          onCancel={closeDeleteTask}
        />
      )}
      <Dialog
        open={isCompleteDialogOpen}
        onClose={closeCompleteDialog}
        aria-labelledby="complete-task-dialog-title"
      >
        <DialogTitle id="complete-task-dialog-title">Mark Task as Completed?</DialogTitle>
        <DialogActions>
          <Button onClick={() => {
            closeCompleteDialog();
            setIsChecked(false); // Reset checkbox when dialog is closed with No
          }} color="primary">
            No
          </Button>
          <Button onClick={handleCompleteTask} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

TaskCard.propTypes = {
  id: PropTypes.number.isRequired,
  task: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  deadline: PropTypes.string,
  priority: PropTypes.oneOf(['high', 'medium', 'low']).isRequired,
  category: PropTypes.string.isRequired,
};

export default TaskCard;
