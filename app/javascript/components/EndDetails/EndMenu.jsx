import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: "42a5f5",
    border: 0,
    borderRadius: 3,
    color: 'white',
    // height: 40,
    width: "80%",
    // padding: '0 30px',
  },
  listItem: {
    // background: 'blue',
    '&:hover': {
      background: "#f50057",
    },
    // color: "white",
    fontSize: 20,
    fontWeight: "bolder",
    padding: '20px'
  },
  
});


const EndMenu = ({ gameState }) => {
  const { ends, currentEnd, currentShot } = gameState;

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const handleClickButton = (event) => {
    setAnchorEl(event.currentTarget);
  };
 
  const handleClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const EndMenuListItems = ends.map((value, index) => {
    return (
      <MenuItem 
        className={classes.listItem}
        key={index} 
        selected={index === selectedIndex}
        onClick={(event) => handleClick(event, index)}
      >
        End {index + 1}
      </MenuItem>
    )
  })

  return (
    <>
      <Button 
      className={classes.root}
      aria-controls="simple-menu" 
      aria-haspopup="true" 
      variant="contained"
      color="primary"
      onClick={handleClickButton} 
      textalign="center">
        {`End ${currentEnd + 1}`}
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
    </>
  );
}

export default EndMenu;