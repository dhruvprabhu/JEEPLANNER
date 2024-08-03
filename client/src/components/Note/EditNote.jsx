import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { updateExistingNote } from '../../features/notes/notesSlice';

const EditNote = ({ note, onClose }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth?.token);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content.join('\n')); // Join the content array into a string with newline separators

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content.join('\n')); // Join the content array into a string with newline separators
  }, [note]);

  const handleEditNote = () => {
    const updatedContent = content.split('\n').filter(line => line.trim() !== ''); // Split the content string back into an array and filter out empty lines
    dispatch(updateExistingNote({ id: note.note_id, noteData: { title, content: updatedContent }, token }));
    onClose();
  };

  return (
    <Card sx={{ width: 414, borderRadius: 2, background: '#FAFAFA', boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.25)' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontFamily: 'sans-serif', fontWeight: 600, color: '#263238', marginBottom: 3, textAlign: 'center' }}>
            Edit Note
          </Typography>
          <IconButton onClick={onClose} sx={{ marginTop: -3 }}><CloseIcon /></IconButton>
        </Box>
        <TextField
          label="Edit title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginBottom: 3 }}
        />
        <TextField
          label="Edit content"
          variant="outlined"
          fullWidth
          multiline
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ marginBottom: 3 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={handleEditNote}
            sx={{
              display: 'flex',
              width: 334,
              padding: '11px 0',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
              background: '#263238',
              fontFamily: 'Lato',
              '&:hover': {
                backgroundColor: '#1f292e',
              },
            }}
          >
            Edit Note
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EditNote;
