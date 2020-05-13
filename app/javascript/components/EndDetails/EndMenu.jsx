import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const EndMenu = ({ ends }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const handleClickButton = (event) => {
    setAnchorEl(event.currentTarget);
  };
 
  const handleClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const EndMenuListItems = ends.map((value, index) => {
    return (
      <MenuItem 
        key={value.id} 
        selected={index === selectedIndex}
        onClick={(event) => handleClick(event, index)}
      >
        End #{index + 1}
      </MenuItem>
    )
  })

  return (
    <div>
      <Button 
      aria-controls="simple-menu" 
      aria-haspopup="true" 
      variant="contained"
      color="primary"
      onClick={handleClickButton} 
      textalign="center">
        Select End
      </Button>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
       {EndMenuListItems}
      </Menu>
    </div>
  );
}

export default EndMenu;