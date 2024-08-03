import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, Box, Container, IconButton, Modal } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PhysicsCategoryCard from './PhysicsCategoryCard';
import ChemCategoryCard from './ChemCategoryCard';
import MathsCategoryCard from './MathsCategoryCard';
import NotesCategoryCard from './NotesCategoryCard';
import { fetchTasks, addTask, clearSessionExpired } from '../../features/tasks/tasksSlice';
import AddTask from '../Task/AddTask';
import '../../styles/Fonts.css';
import SessionExpiredModal from './SessionExpiredModal'; // Import the modal
import TaskNotification from '../Notifications/TaskNotification';

const CategoryCards = () => {
  const dispatch = useDispatch();
  const { physicsTasks, chemistryTasks, mathsTasks, sessionExpired } = useSelector((state) => state.tasks);
  const token = localStorage.getItem('accessToken');

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (!token) {
      console.log('No token found');
      return;
    }

    const fetchTasksInterval = setInterval(() => {
      dispatch(fetchTasks(token));
    }, 1000); // Fetch tasks every 1 second

    // Clean-up function
    return () => clearInterval(fetchTasksInterval);
  }, [dispatch, token]);

  const handleOpenDialog = (category) => {
    setSelectedCategory(category);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddTask = (taskData) => {
    const taskWithCategory = { ...taskData, category: selectedCategory };
    dispatch(addTask(taskWithCategory));
    handleCloseDialog();
  };

  const handleSessionExpiredClose = () => {
    // Handle session expiration (e.g., redirect to login)
    dispatch(clearSessionExpired());
    // You can navigate to the login page here
  };

  return (
    <Container sx={{ marginTop: 2, marginLeft: 0.2 }}>
      <TaskNotification />
      <Grid container spacing={35}>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 600,
                  marginLeft: 14,
                  color: '#fafafa',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                Physics
              </Typography>
              <IconButton
                size="small"
                sx={{ marginLeft: 1, color: '#fafafa' }}
                onClick={() => handleOpenDialog('Physics')}
              >
                <AddCircleIcon fontSize="large" />
              </IconButton>
            </Box>
            <PhysicsCategoryCard tasks={physicsTasks} />
          </Box>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 600,
                  marginLeft: 19,
                  color: '#fafafa',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                Chemistry
              </Typography>
              <IconButton
                size="small"
                sx={{ marginLeft: 1, color: '#fafafa' }}
                onClick={() => handleOpenDialog('Chemistry')}
              >
                <AddCircleIcon fontSize="large" />
              </IconButton>
            </Box>
            <ChemCategoryCard tasks={chemistryTasks} />
          </Box>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 600,
                  marginLeft: 12,
                  color: '#fafafa',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                Maths
              </Typography>
              <IconButton
                size="small"
                sx={{ marginLeft: 1, color: '#fafafa' }}
                onClick={() => handleOpenDialog('Maths')}
              >
                <AddCircleIcon fontSize="large" />
              </IconButton>
            </Box>
            <MathsCategoryCard tasks={mathsTasks} />
          </Box>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 600,
                  marginLeft: 5,
                  color: '#fafafa',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                Notes
              </Typography>
            </Box>
            <NotesCategoryCard />
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="add-task-modal-title"
        aria-describedby="add-task-modal-description"
      >
        <Box>
          <AddTask onClose={handleCloseDialog} onAddTask={handleAddTask} />
        </Box>
      </Modal>
      <SessionExpiredModal
        open={sessionExpired}
        onClose={handleSessionExpiredClose}
      />
    </Container>
  );
};

export default CategoryCards;