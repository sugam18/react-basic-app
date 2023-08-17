import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { formatDate } from '../../utils/common';
const TaskListItem = ({ task, onClick }) => {
  const formattedCreationDate = task
    ? formatDate(task?.creationDate)
    : '';
  return (
    <Card onClick={() => onClick(task.id)}>
      <CardContent>
        <Typography variant="h6">{task.name}</Typography>
        <Typography variant="body2">{task.processName}</Typography>
        <Typography variant="body2">{formattedCreationDate}</Typography>
        {/* <Typography variant="body2">{task.processName}</Typography> */}
      </CardContent>
    </Card>
  );
};

export default TaskListItem;
