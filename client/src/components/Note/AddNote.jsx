// client/src/components/Note/AddNote.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Typography, TextField, Button, Box, IconButton, List, ListItem, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { addNote } from '../../features/notes/notesSlice';

const AddNote = ({ handleClose }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth?.token);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [listItems, setListItems] = useState([]);
  const [error, setError] = useState(false);

  const handleAddListItem = () => {
    if (content.trim() === '') {
      setError(true);
      return;
    }
    setListItems([...listItems, content]);
    setContent('');
    setError(false);
  };

  const handleAddNote = () => {
    if (listItems.length === 0) {
      setError(true);
      return;
    }
    dispatch(addNote({ note: { title, content: listItems.join('\n') }, token }));
    setTitle('');
    setContent('');
    setListItems([]);
    setError(false);
    handleClose();
  };

  return (
    <Card sx={{ width: 414, borderRadius: 2, background: '#FAFAFA', boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.25)' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontFamily: 'sans-serif', fontWeight: 600, color: '#263238', marginBottom: 3, textAlign: 'center' }}>
            Add Note
          </Typography>
          <IconButton onClick={handleClose} sx={{ marginTop: -3 }}><CloseIcon /></IconButton>
        </Box>
        <TextField
          label="Add title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginBottom: 3 }}
        />
        <TextField
          label="Add list item"
          variant="outlined"
          fullWidth
          required
          error={error}
          helperText={error ? "Content is required" : ""}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ marginBottom: 3 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 1 }}>
          <Button
            variant="contained"
            onClick={handleAddListItem}
            sx={{
              display: 'flex',
              width: 334,
              padding: '11px 0',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
              background: '#50C878',
              fontFamily: 'Lato',
              '&:hover': {
                backgroundColor: '#50C878',
              },
            }}
          >
            Add List Item
          </Button>
        </Box>
        <List dense>
          {listItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={handleAddNote}
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
            Add Note
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AddNote;
