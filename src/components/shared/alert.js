import React, { useState, useEffect } from 'react';
import { Alert as MuiAlert, LinearProgress } from '@mui/material';

const Alert = ({ message, severity, onClose, autoHideDuration }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 1);
    }, (autoHideDuration * 1000) / 100);

    return () => {
      clearInterval(interval);
    };
  }, [autoHideDuration]);

  useEffect(() => {
    if (progress >= 100) {
      onClose();
    }
  }, [progress, onClose]);

  return (
    <div className='mui-alert'>
      <MuiAlert severity={severity} onClose={onClose}>
        {message}
      </MuiAlert>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
};

export default Alert;
