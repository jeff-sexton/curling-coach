import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    // background: 'linear-gradient(45deg, #3f51b5, #5f94b1 90%)',
    background: "#4dd0e1",
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 40,
    padding: '0 30px',
  },
  listItem: {
    // background: 'blue',
    '&:hover': {
      background: "#f50057",
    },
    color: "white",
    fontSize: 20,
    fontWeight: "bolder",
    padding: '20px'
  },
  
});

const ThrowTurn = ({ gameState }) => {
  const classes = useStyles();
  const { currentEnd, currentShot, ends } = gameState;
 
  const throwOrderForEnd = ends[currentEnd].end.throw_order; 
  const currentPlayer = throwOrderForEnd[currentShot]; 
 

  const [anchorEl, setAnchorEl] = useState(null);

  const [selectedIndex, setSelectedIndex] = useState(currentShot);
  

  let playerText = currentShot > 1 && throwOrderForEnd[currentShot].name === throwOrderForEnd[currentShot - 2].name ? `It is ${throwOrderForEnd[currentShot].name}'s second shot` : `It is ${throwOrderForEnd[currentShot].name}'s first shot`;


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

  const ThrowOrderListItems = throwOrderForEnd.map((value, index) => {

    let playerText = index > 1 && value.name === throwOrderForEnd[index - 2].name ? `${value.name}'s second shot` : `${value.name}'s first shot`;
    return (
      <MenuItem 
        className={classes.listItem}
        key={index} 
        selected={index === selectedIndex}
        onClick={(event) => handleClick(event, index)}
      >
        {playerText}
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
        {playerText}
      </Button>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {ThrowOrderListItems} 
      </Menu>
    </>
  );
}

export default ThrowTurn;