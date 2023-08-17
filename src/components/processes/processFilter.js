import React, { useState } from "react";
import { TextField } from "@mui/material";

const ProcessFilter = ({ onFilter }) => {
  const [filterText, setFilterText] = useState("");

  const handleFilterChange = (event) => {
    const newText = event.target.value;
    setFilterText(newText);
    onFilter(newText);
  };

  return (
    <div style={{marginBottom: '1rem', width:'25%'}}>
      <TextField
        label="Type to filter..."
        variant="outlined"
        fullWidth
        value={filterText}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default ProcessFilter;
