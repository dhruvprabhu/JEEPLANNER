import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as notesApi from '../../api/notesApi';

const initialState = {
  notes: [],
  status: 'idle',
  error: null,
};

// Async Thunks
export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  try {
    const data = await notesApi.getAllNotes();
    return data;
  } catch (error) {
    return Promise.reject(error);  // Ensure errors are handled correctly
  }
});


export const addNote = createAsyncThunk('notes/addNote', async ({ note, token }) => {
  const data = await notesApi.createNote(note, token);
  return data;
});

export const updateExistingNote = createAsyncThunk('notes/updateExistingNote', async ({ id, noteData }) => {
  try {
    const data = await notesApi.updateNote(id, noteData);
    return { id, ...data };
  } catch (error) {
    return Promise.reject(error);  // Ensure errors are handled correctly
  }
});

export const removeNote = createAsyncThunk('notes/removeNote', async (id) => {
  try {
    await notesApi.deleteNote(id);
    return id;
  } catch (error) {
    return Promise.reject(error);  // Ensure errors are handled correctly
  }
});

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(updateExistingNote.fulfilled, (state, action) => {
        const { id, ...updatedNote } = action.payload;
        const existingNoteIndex = state.notes.findIndex((note) => note.note_id === id);
        if (existingNoteIndex !== -1) {
          state.notes[existingNoteIndex] = { ...state.notes[existingNoteIndex], ...updatedNote };
        }
      })
      .addCase(removeNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.note_id !== action.payload);
      })
      .addMatcher(
        (action) => action.type.endsWith('rejected'),
        (state, action) => {
          state.error = action.error.message;
        }
      );
  },
});

export default notesSlice.reducer;
