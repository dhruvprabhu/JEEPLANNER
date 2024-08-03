import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasksSlice';
import notesReducer from '../features/notes/notesSlice'; // assuming you have notesSlice as well
import userReducer from '../features/user/userSlice';

const store = configureStore({
  reducer: {
    
    tasks: tasksReducer,
    notes: notesReducer,
    user: userReducer,
  
  },
});

export default store;
