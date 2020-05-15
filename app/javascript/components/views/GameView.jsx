import React, { useState, useEffect } from 'react';

import useApplicationData from '../../hooks/useApplicationData';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import StrategyBoard from '../StrategyBoard';
import GameDetails from '../GameDetails';
import EndDetails from '../EndDetails';
import ShotDetails from '../ShotDetails';
import Buttons from '../Buttons';
import EndModal from '../EndModal';

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

const GameView = ({ gameId }) => {
  const classes = useStyles();
  const game_id = gameId || 2;

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

  const [isEditable, setIsEditable] = useState(true);

  const { currentShot, loaded, currentEnd } = gameState;

  useEffect(() => {
    if (loaded && gameState.ends[currentEnd].shots[currentShot].id) {
      setIsEditable(false);
    } else {
      setIsEditable(true);
    }
  }, [currentShot, loaded]);

  return (
    <>
      {!loaded && (
        <div>
          <h1>LOADING</h1>
        </div>
      )}
      {loaded && (
        <div className={classes.root}>
          <Box display="flex" justifyContent="space-around" height="80vh">
            <StrategyBoard
              nextShot={nextShot}
              prevShot={prevShot}
              gameState={gameState}
              storeRockHistory={storeRockHistory}
              isEditable={isEditable}
            />

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
                <EndDetails gameState={gameState} />
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
          <EndModal gameState={gameState} startEnd={startEnd} />
        </div>
      )}
    </>
  );
};

export default GameView;
