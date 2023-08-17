import React, {useState} from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const TaskFilter = ({ onFilterChange }) => {
  const [filterValue, setFilterValue] = useState('allopen');

  const handleFilterChange = (event) => {
    const newFilterValue = event.target.value;
    setFilterValue(newFilterValue);
    onFilterChange(newFilterValue);
  };

  return (
    <FormControl variant="outlined" style={{width:'100%', paddingBottom:'1rem'}}>
      <InputLabel id="filter-label">Filter</InputLabel>
      <Select
        labelId="filter-label"
        id="filter"
        value={filterValue}
        onChange={handleFilterChange}
        label="Filter"
      >
        <MenuItem value="allopen">All Open</MenuItem>
        <MenuItem value="assignedToMe">Assigned to Me</MenuItem>
        <MenuItem value="completed">Completed</MenuItem>
        <MenuItem value="unassigned">Unassigned</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TaskFilter;
