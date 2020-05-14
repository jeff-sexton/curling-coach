import React, { useState } from 'react';

import useApplicationData from '../../hooks/useApplicationData';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import StrategyBoard from '../StrategyBoard';
import GameDetails from '../GameDetails';
import ShotDetails from '../ShotDetails';
import Buttons from '../Buttons';
import { useEffect } from 'react';

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

const GameView = ({gameId}) => {
  const classes = useStyles();
  const game_id = gameId || 1;

  const {
    gameState,
    nextShot,
    prevShot,
    saveShot,
    endGame,
    startEnd,
    storeRockHistory,
    storeShotDetails,
  } = useApplicationData(game_id);




  // add useEffect to reset shot details or grab existing details on each shot
  // useEffect(() => {
  //   if (gameState.ends[gameState.currentEnd]) {
  //     const initialHistory = [];

  //     for (const shot of gameState.ends[gameState.currentEnd].shots) {
  //       if (shot.rock_paths && shot.rock_paths.length > 0) {
  //         initialHistory.push(shot.rock_paths);
  //       }
  //     }

  //     setPathHistory(initialHistory);
  //   }
  // }, [gameState.loaded, gameState.currentEnd]);


  return (
    <>
      {!gameState.loaded && (
        <div>
          <h1>LOADING</h1>
        </div>
      )}
      {gameState.loaded && (
        <div className={classes.root}>
          <Box display="flex" justifyContent="space-around" height="70vh">
            <StrategyBoard
              nextShot={nextShot}
              prevShot={prevShot}
              gameState={gameState}
              storeRockHistory={storeRockHistory}
            />
            {gameState.ends[gameState.currentEnd] &&
              !gameState.ends[gameState.currentEnd].end.first_team_id && (
                <button
                  onClick={() => {
                    startEnd(1);
                  }}
                >
                  Set Order
                </button>
              )}

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
                <div>event here</div>
              </Paper>
              <Paper elevation={3} className={classes.padding10}>
                <ShotDetails
                  gameState={gameState}
                  storeShotDetails={storeShotDetails}
                />
              </Paper>
              <Buttons saveShot={saveShot} endGame={endGame} />
            </Box>
          </Box>
        </div>
      )}
    </>
  );
};

export default GameView;
