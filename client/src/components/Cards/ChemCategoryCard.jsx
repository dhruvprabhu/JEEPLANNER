// src/components/Cards/ChemCategoryCard.jsx
import React from 'react';
import { Card, Box } from '@mui/material';
import TaskCard from '../Task/TaskCard';

const ChemCategoryCard = ({ tasks }) => {
  
  return (
    <Card
      sx={{
        width: 300,
        height: 645,
        flexShrink: 0,
        borderRadius: 2,
        backgroundColor: '#DEEEF6',
        padding: '16px 15px 15px 15px',
        marginLeft: -1,
        marginTop: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Box sx={{ flexGrow: 1, overflowY: 'auto', width: '100%', marginTop: -2 }}>
        {tasks.map((task) => (
          <TaskCard 
            key={task.task_id}
            id={task.task_id}
            task={task.task}
            created_at={task.created_at}
            deadline={task.deadline}
            priority={task.priority}
            category="Chemistry"
          />
        ))}
      </Box>
    </Card>
  );
};

export default ChemCategoryCard;
