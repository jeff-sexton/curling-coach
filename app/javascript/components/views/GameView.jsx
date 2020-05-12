import React from 'react';

import useApplicationData from '../../hooks/useApplicationData';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import StrategyBoard from '../StrategyBoard';
import GameDetails from '../GameDetails';
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

  const {
    gameState,
    nextShot,
    prevShot,
    saveShot,
    endGame,
    initializeEnd,
  } = useApplicationData();



  const onSave = () => {
    const currentEnd = gameState.currentEnd;
    const currentShot = gameState.currentShot;

    const end_id = gameState.ends[currentEnd].end.id;
    const shot_number = currentShot + 1;
    const player_id =
      gameState.ends[currentEnd].end.throw_order[currentShot].id;

    const shot = {
      end_id,
      shot_number,
      rotation: '',
      rating: '',
      shot_type: '',
      rock_paths: [],
      player_id,
    };

    saveShot(shot);
  };

  return (
    <div className={classes.root}>
      <Box display="flex" justifyContent="space-around" height="70vh">
        <StrategyBoard
          nextShot={nextShot}
          prevShot={prevShot}
          gameState={gameState}
        />
          {gameState.ends[gameState.currentEnd] && !gameState.ends[gameState.currentEnd].end.first_team_id && <button onClick={()=> {initializeEnd(1)}}>Set Order</button>}

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          width="40%"
        >
          <Paper elevation={3} className={classes.padding10}>
            <GameDetails gameState={gameState} />
          </Paper>
          <Paper elevation={3} className={classes.padding10}>
            <ShotDetails gameState={gameState} />
          </Paper>
          <Paper elevation={3} className={classes.padding10}>
            <ShotDetails />
          </Paper>
          <Buttons saveShot={onSave} endGame={endGame} />
        </Box>
      </Box>
    </div>
  );
};

export default GameView;
