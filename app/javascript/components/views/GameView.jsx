import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import StrategyBoard from '../StrategyBoard';
import GameDetails from '../GameDetails';
import ShotDetails from '../ShotDetails';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '10px',
  },
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  padding10: {
    padding: 10,
  },
}));

const GameView = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box display="flex" justifyContent="space-around">
        <StrategyBoard />

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          width="40%"
        >
          <Paper elevation={3} className={classes.padding10}>
            <GameDetails/>
          </Paper>
          <Paper elevation={3} className={classes.padding10}>
            <ShotDetails />
          </Paper>
          <Paper elevation={3} className={classes.padding10}>
            <ShotDetails />
          </Paper>
        </Box>
      </Box>
    </div>
  );
};

export default GameView;
