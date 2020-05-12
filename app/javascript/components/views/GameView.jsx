import React from 'react';

import useApplicationData from '../../hooks/useApplicationData'

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import StrategyBoard from '../StrategyBoard';
import GameDetails from '../GameDetails';
import EndDetails from '../EndDetails'
import ShotDetails from '../ShotDetails';
import Buttons from '../Buttons';


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

  const { gameState, nextShot, prevShot, saveShot, endGame } = useApplicationData();


  return (
    <div className={classes.root}>
      <Box display="flex" justifyContent="space-around" height='70vh' >
        <StrategyBoard nextShot={nextShot} prevShot={prevShot} gameState={gameState} />

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          width="40%"
        >
          <Paper elevation={3} className={classes.padding10}>
            <GameDetails gameState={gameState}/>
          </Paper>
          <Paper elevation={3} className={classes.padding10}>
            <EndDetails gameState={gameState}/>
          </Paper>
          <Paper elevation={3} className={classes.padding10}>
            <ShotDetails />
          </Paper>
          {/* <Buttons saveShot={saveShot} endGame={endGame} /> */}
        </Box>
      </Box>
    </div>
  );
};

export default GameView;
