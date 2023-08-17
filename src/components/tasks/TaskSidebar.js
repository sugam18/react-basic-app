import React from 'react';
import { Paper, Typography } from '@mui/material';
import { formatDate } from '../../utils/common';
const TaskSidebar = ({ selectedTask }) => {
    const formattedCreationDate = selectedTask
    ? formatDate(selectedTask.creationDate)
    : '';
    const formattedDueDate = selectedTask?.dueDate ? formatDate(selectedTask?.dueDate) : 'No due date';
  return (
    <Paper elevation={3} style={{ padding: '1rem' }}>
      <Typography variant="h6">Details</Typography>
      <div style={{ marginTop: '1rem' }}>
        <Typography variant="subtitle1">Creation Date</Typography>
        <Typography>{formattedCreationDate}</Typography>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Typography variant="subtitle1">Candidate</Typography>
        <Typography>No Candidates</Typography>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Typography variant="subtitle1">Completion Date</Typography>
        <Typography>Pending task</Typography>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Typography variant="subtitle1">Due Date</Typography>
        <Typography>{formattedDueDate}</Typography>
      </div>
      {/* You can add more details here */}
    </Paper>
  );
};

export default TaskSidebar;
