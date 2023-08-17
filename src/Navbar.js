import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import myImage from './assets/tcs-logo.png' // Adjust the path based on your actual folder structure

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-start' }}>
      <div style={{ display: 'flex', alignItems: 'center'}}>
          <img src={myImage} alt="Logo" height="40" style={{ marginRight: '10px' }} />
          {/* <Typography variant="h6" component="div">
            My App
          </Typography> */}

        </div>
        <div className='menu-links'>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/tasks">
            Tasks
          </Button>
          <Button color="inherit" component={Link} to="/processes">
            Processes
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Dashboard
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
