import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const EndMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button 
      aria-controls="simple-menu" 
      aria-haspopup="true" 
      variant="contained"
      color="primary"
      onClick={handleClick} 
      textAlign="center">
        Select End
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>End #1</MenuItem>
        <MenuItem onClick={handleClose}>End #2</MenuItem>
        <MenuItem onClick={handleClose}>End #3</MenuItem>
      </Menu>
    </div>
  );
}

export default EndMenu;