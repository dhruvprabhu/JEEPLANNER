// NotesCategoryCard.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Box, Fab, Modal, Backdrop, Fade } from '@mui/material';
import NoteCard from '../Note/NoteCard'; // Ensure the path is correct
import LibraryAddRoundedIcon from '@mui/icons-material/LibraryAddRounded';
import AddNote from '../Note/AddNote';
import EditNote from '../Note/EditNote';
import DeleteNoteConfirm from '../Note/DeleteNoteConfirm';
import { fetchNotes, addNote, updateExistingNote, removeNote } from '../../features/notes/notesSlice';

const NotesCategoryCard = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const noteStatus = useSelector((state) => state.notes.status);
  const [currentNote, setCurrentNote] = useState(null);
  const [showAddCard, setShowAddCard] = useState(false);
  const [showEditCard, setShowEditCard] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchNotes(searchTerm));
    };

    const fetchDataWithDelay = () => {
      setTimeout(fetchData, 1000); // Adjust the delay time (in milliseconds) as needed
    };

    if (noteStatus === 'idle' || noteStatus === 'succeeded') {
      fetchDataWithDelay();
    }

    // Clean-up function
    return () => clearTimeout(fetchDataWithDelay);
  }, [dispatch, noteStatus, searchTerm]);

  const handleAddNoteClick = () => {
    setShowAddCard(true);
  };

  const handleAddNote = async (newNote) => {
    await dispatch(addNote(newNote));
    setShowAddCard(false);
  };

  const handleCloseAddNote = () => {
    setShowAddCard(false);
  };

  const handleEditNoteClick = (note) => {
    setCurrentNote(note);
    setShowEditCard(true);
  };

  const handleEditNote = async (updatedNote) => {
    await dispatch(updateExistingNote({ id: updatedNote.note_id, noteData: updatedNote }));
    setShowEditCard(false);
  };

  const handleCloseEditNote = () => {
    setShowEditCard(false);
  };

  const handleDeleteNoteClick = (note) => {
    setCurrentNote(note);
    setShowDeleteConfirm(true);
  };

  const handleDeleteNote = async () => {
    if (currentNote && currentNote.note_id) {
      await dispatch(removeNote(currentNote.note_id));
      setShowDeleteConfirm(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <Card
      sx={{
        width: 300,
        height: 648,
        flexShrink: 0,
        borderRadius: 2,
        backgroundColor: '#FFE5E3',
        padding: '16px 15px 15px 15px',
        marginLeft: -1,
        marginTop: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Box sx={{ flexGrow: 1, overflowY: 'auto', width: '100%', marginTop: -2 }}>
        {notes.map((note, index) => (
          <NoteCard
            key={index}
            note={note}
            onEditClick={() => handleEditNoteClick(note)}
            onDeleteClick={() => handleDeleteNoteClick(note)}
          />
        ))}
      </Box>
      <Fab
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          backgroundColor: 'white',
          color: '#000',
          '&:hover': {
            backgroundColor: '#FFDAD9',
          },
        }}
        aria-label="add"
        onClick={handleAddNoteClick}
      >
        <LibraryAddRoundedIcon />
      </Fab>

      {/* Modal for AddNote */}
      <Modal
        open={showAddCard}
        onClose={handleCloseAddNote}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showAddCard}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <AddNote onAddNote={handleAddNote} handleClose={handleCloseAddNote} />
          </Box>
        </Fade>
      </Modal>

      {/* Modal for EditNote */}
      <Modal
        open={showEditCard}
        onClose={handleCloseEditNote}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showEditCard}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <EditNote note={currentNote} onEditNote={handleEditNote} onClose={handleCloseEditNote} />
          </Box>
        </Fade>
      </Modal>

      {/* Modal for DeleteNoteConfirm */}
      <Modal
        open={showDeleteConfirm}
        onClose={handleCancelDelete}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showDeleteConfirm}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <DeleteNoteConfirm note={currentNote} onDelete={handleDeleteNote} onCancel={handleCancelDelete} />
          </Box>
        </Fade>
      </Modal>
    </Card>
  );
};

export default NotesCategoryCard;
