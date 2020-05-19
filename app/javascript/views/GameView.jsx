import React, { useState, useEffect } from 'react';

import useGameData from '../hooks/useGameData';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import StrategyBoard from '../components/StrategyBoard';
import GameDetails from '../components/GameDetails';
import EndDetails from '../components/EndDetails';
import ShotDetails from '../components/ShotDetails';
import Buttons from '../components/Buttons';
import StartEndModal from '../components/StartEndModal';
import FinishEndModal from '../components/FinishEndModal';
import Loading from '../components/Loading';

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
    padding: theme.spacing(1.5),
  },
}));


const GameView = ({ gameId, handleStatsSelection }) => {
  const classes = useStyles();

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

  const handleStatsClick = () => {
    handleStatsSelection(gameId);
  }

  return (
    <>
      {!loaded && <Loading />}
      {loaded && (
        <div className={classes.root}>
          <Box display="flex" justifyContent="space-around" height="80vh">
            <StrategyBoard
              nextShot={nextShot}
              prevShot={prevShot}
              setShot={setShot}
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
                  handleStatsClick={handleStatsClick}
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
          <FinishEndModal
            gameState={gameState}
            finishEnd={finishEnd}
            startEnd={startEnd}
          />
        </div>
      )}
    </>
  );
};

export default GameView;
