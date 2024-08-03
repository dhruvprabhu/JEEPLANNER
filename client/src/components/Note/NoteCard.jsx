import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, IconButton, ListItem, ListItemText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../../styles/Fonts.css';

const NoteCard = ({ note, onEditClick, onDeleteClick }) => {
  const { date, title, content } = note;
  const isArrayContent = Array.isArray(content);
  const initialSlashedState = isArrayContent ? content.map(() => false) : []; // Initialize the slashed state for each item
  const [slashedItems, setSlashedItems] = useState(initialSlashedState);

  const handleItemClick = (index) => {
    setSlashedItems((prevState) =>
      prevState.map((item, i) => (i === index ? !item : item))
    );
  };

  return (
    <Card sx={{ width: 300, borderRadius: 7, background: '#FAFAFA', boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.25)', marginTop: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ color: '#625F5F', fontFamily: 'Montserrat', fontSize: 20, fontWeight: 400, marginBottom: 1 }}>
            {date}
          </Typography>
          <Box>
            <IconButton size="small" onClick={(e) => { e.stopPropagation(); onEditClick(); }}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" onClick={(e) => { e.stopPropagation(); onDeleteClick(); }}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        <Typography
          variant="h6"
          sx={{
            color: '#263238',
            fontWeight: 700,
            fontFamily: '"Noto Serif", serif',
            marginBottom: 1,
            textAlign: 'left',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
          }}
        >
          {title}
        </Typography>
        {isArrayContent ? (
          <Box component="ol" sx={{ paddingLeft: 2 }}>
            {content.map((item, index) => (
              <ListItem
                key={index}
                sx={{ display: 'list-item', padding: 0, cursor: 'pointer' }}
                onClick={() => handleItemClick(index)}
              >
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{
                    variant: 'body1',
                    sx: {
                      color: '#000',
                      fontWeight: 400,
                      fontFamily: '"Noto Serif", serif',
                      marginBottom: 1,
                      textAlign: 'left',
                      textDecoration: slashedItems[index] ? 'line-through' : 'none',
                    },
                  }}
                />
              </ListItem>
            ))}
          </Box>
        ) : (
          <Typography
            variant="body1"
            sx={{
              color: '#000',
              fontWeight: 400,
              fontFamily: '"Noto Serif", serif',
              marginBottom: 1,
              textAlign: 'left',
            }}
          >
            {content}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default NoteCard;
