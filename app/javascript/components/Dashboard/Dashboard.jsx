import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import GamePreview from './GamePreview';

const useStyles = makeStyles(() => ({
  root: {
    '& > *': {
      // margin: theme.spacing(1),
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    margin: "auto",
    maxWidth: 800,
  },
}));

const Dashboard = ({ onClick }) => {
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <h1> Status Board </h1>
      <GamePreview onClick={onClick}/>
      <GamePreview onClick={onClick}/>
      <GamePreview onClick={onClick}/>
    </div>
  )
}

export default Dashboard;