import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasksApi, addTaskApi, updateTaskApi, deleteTaskApi, completeTaskApi } from '../../api/tasksApi';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchTasksApi();
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const addTask = createAsyncThunk('tasks/addTask', async (taskData, { rejectWithValue }) => {
  try {
    const response = await addTaskApi(taskData);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, taskData }, { rejectWithValue }) => {
  try {
    const response = await updateTaskApi(id, taskData);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async ({ id, category }, { rejectWithValue }) => {
  try {
    await deleteTaskApi(id);
    return { id, category };
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const completeTask = createAsyncThunk('tasks/completeTask', async ({ id, category }, { rejectWithValue }) => {
  try {
    await completeTaskApi(id);
    return { id, category };
  } catch (error) {
    return rejectWithValue(error);
  }
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    physicsTasks: [],
    chemistryTasks: [],
    mathsTasks: [],
    status: 'idle',
    error: null,
    sessionExpired: false,
  },
  reducers: {
    clearSessionExpired(state) {
      state.sessionExpired = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        action.payload.forEach(category => {
          if (category.category === 'Physics') {
            state.physicsTasks = category.tasks;
          } else if (category.category === 'Chemistry') {
            state.chemistryTasks = category.tasks;
          } else if (category.category === 'Maths') {
            state.mathsTasks = category.tasks;
          }
        });
        state.sessionExpired = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        if (action.payload === 'Invalid Token') {
          state.sessionExpired = true;
        }
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const { category, task } = action.payload;
        if (category === 'Physics') {
          state.physicsTasks.push(task);
        } else if (category === 'Chemistry') {
          state.chemistryTasks.push(task);
        } else if (category === 'Maths') {
          state.mathsTasks.push(task);
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const tasks = state[`${updatedTask.category.toLowerCase()}Tasks`];
        const index = tasks.findIndex(task => task.task_id === updatedTask.task_id);
        if (index !== -1) {
          tasks[index] = updatedTask;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const { id, category } = action.payload;
        const tasks = state[`${category.toLowerCase()}Tasks`];
        state[`${category.toLowerCase()}Tasks`] = tasks.filter(task => task.task_id !== id);
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        const { id, category } = action.payload;
        const tasks = state[`${category.toLowerCase()}Tasks`];
        state[`${category.toLowerCase()}Tasks`] = tasks.filter(task => task.task_id !== id);
      });
  },
});

export const { clearSessionExpired } = tasksSlice.actions;
export default tasksSlice.reducer;
