import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';

const Loader = ({ isLoading }) => {
  return (
    isLoading && (
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000, // Ensure the loader is on top of other content
        }}
      >
        <CircularProgress />
      </div>
    )
  );
};

export default Loader;
