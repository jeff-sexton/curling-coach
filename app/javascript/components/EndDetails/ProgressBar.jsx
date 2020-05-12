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

const ProgressBar = ({ end }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <LinearProgress variant="determinate" value={(end / 10) * 100} />
    </div>
  );
}

export default ProgressBar;