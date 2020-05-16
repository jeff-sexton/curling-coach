import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: "42a5f5",
    border: 0,
    borderRadius: 3,
    color: 'white',
    width: "fit-content",
  }
}));

const ThrowTurn = ({ gameState, setShot }) => {
  const classes = useStyles();
  const { currentEnd, currentShot, ends } = gameState;
 
  const throwOrderForEnd = ends[currentEnd].end.throw_order; 
  
  const playerText = currentShot > 1 && throwOrderForEnd[currentShot].name === throwOrderForEnd[currentShot - 2].name ? `It is ${throwOrderForEnd[currentShot].name}'s second shot` : `It is ${throwOrderForEnd[currentShot].name}'s first shot`;



  return (
    <>
      <Button 
        className={classes.root}
        variant="contained"
        color="primary"
        // onClick={() => setOpen(true)} 
        textalign="center"
      >
        {playerText}
      </Button>
    </>
  );
}

export default ThrowTurn;