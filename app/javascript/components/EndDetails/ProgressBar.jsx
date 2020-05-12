import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const ProgressBar = ({ end, currentShot }) => {
  const classes = useStyles();

  const calculateBar = (end, currentShot) => {
    return ((end / 10) * 100) - 10 + ((currentShot / 16) * 10)
  }
  
  return (
    <div className={classes.root}>
      <LinearProgress variant="determinate" value={calculateBar(end, currentShot)} />
    </div>
  );
}

export default ProgressBar;