import React, {useState, useEffect} from 'react';

import useApplicationData from '../../hooks/useApplicationData'

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

  const { gameState, getGameDetails, nextShot, prevShot, saveShot } = useApplicationData();

  // const [gameState, setGameState] = useState({});

  // const [shot, setShot] = useState(1);
  // const [end, setEnd] = useState(1);


  // Get Game details from API
  useEffect(()=> {
    getGameDetails()

  },[]);



  

  // const nextShot = () => {
  //   setShot((prev) => prev + 1);
  // };
  // const prevShot = () => {
  //   setShot((prev) => {
  //     if (prev > 1) {
  //       return prev - 1;
  //     }
  //     return prev;
  //   });
  // };

  // const save = () => {
  //   nextShot();
  //   // Save forms & shot path history to server here
  // };

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
            <ShotDetails gameState={gameState}/>
          </Paper>
          <Paper elevation={3} className={classes.padding10}>
            <ShotDetails />
          </Paper>
          <div>
            <button onClick={saveShot}>Save</button>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default GameView;
