// client/src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteUser as deleteUserApi, updateUser as updateUserApi } from '../../api/userApi';

// Thunk for updating user data
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData, thunkAPI) => {
    try {
      const data = await updateUserApi(userData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk for deleting user
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (_, thunkAPI) => {
    try {
      await deleteUserApi();
      return; // No need to return data if deletion is successful
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    // Optional: Add additional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; // Assuming the response payload contains the updated user data
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.user = null; // Clear user data on successful deletion
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
