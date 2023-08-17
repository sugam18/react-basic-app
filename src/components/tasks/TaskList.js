import React from 'react';
import TaskListItem from './TaskListItem';
import { Grid } from '@mui/material';

const TaskList = ({ tasks, onTaskClick }) => {
  return (
    <div>
      <Grid container spacing={2}>
        {tasks.map(task => (
          <Grid item xs={12} key={task.id}>
            <TaskListItem task={task} onClick={onTaskClick} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TaskList;
