import React, { useState, useEffect } from 'react';

import useGameData from '../hooks/useGameData';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';

import StrategyBoard from '../components/StrategyBoard';
import GameDetails from '../components/GameDetails';
import EndDetails from '../components/EndDetails';
import ShotDetails from '../components/ShotDetails';
import Buttons from '../components/Buttons';
import StartEndModal from '../components/StartEndModal';
import FinishEndModal from '../components/FinishEndModal';
import LoadingIcon from '../assets/Loading_icon.svg';

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

const loadingStyles = makeStyles({
  loadingBox: {
    width: '40%',
    margin: 'auto',
    textAlign: 'center',
  },
  root: {
    width: '100%',
    position: 'relative',
    animation: '$animation 3s infinite',
    animationTimingFunction: 'linear',
  },
  '@keyframes animation': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
});

const GameView = ({ gameId }) => {
  const classes = useStyles();
  const loadingClasses = loadingStyles();

  const {
    gameState,
    nextShot,
    prevShot,
    saveShot,
    setShot,
    setEnd,
    endGame,
    startEnd,
    finishEnd,
    storeRockHistory,
    storeShotDetails,
    loadGameData,
  } = useGameData();

  useEffect(() => {
    if (gameId) {
      loadGameData(gameId);
    }
  }, [gameId]);

  const [isEditable, setIsEditable] = useState(true);

  const { currentShot, loaded, currentEnd } = gameState;

  useEffect(() => {
    if (loaded && gameState.ends[currentEnd].shots[currentShot].id) {
      setIsEditable(false);
    } else {
      setIsEditable(true);
    }
  }, [currentShot, loaded, currentEnd]);

  const handleEdit = () => {
    setIsEditable(true);
  };

  return (
    <>
      {!loaded && (
        <Box
          className={loadingClasses.loadingBox}
          display="flex"
          flexDirection="column"
        >
          <Box>
            <h1>LOADING</h1>
          </Box>
          <Box>
            <CardMedia
              image={LoadingIcon}
              component="img"
              classes={{ root: loadingClasses.root }}
            />
          </Box>
        </Box>
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
                <EndDetails
                  gameState={gameState}
                  setShot={setShot}
                  setEnd={setEnd}
                />
              </Paper>
              <Paper elevation={3} className={classes.padding10}>
                <ShotDetails
                  gameState={gameState}
                  storeShotDetails={storeShotDetails}
                  isEditable={isEditable}
                />
              </Paper>
              <Buttons
                saveShot={saveShot}
                handleEdit={handleEdit}
                endGame={endGame}
                isEditable={isEditable}
              />
            </Box>
          </Box>
          <StartEndModal gameState={gameState} startEnd={startEnd} />
          <FinishEndModal gameState={gameState} finishEnd={finishEnd} startEnd={startEnd} />
        </div>
      )}
    </>
  );
};

export default GameView;
