import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import GameInfoStyles from './GameInfoStyles';

const useStyles = makeStyles(GameInfoStyles);

const GameInfo = () => {
  const classes = useStyles();

  return (
    <div>
      <Box textAlign="center" className={classes.gameInfo}>
        <Box mb={1}>Friday, May 1, 2020 | 7PM</Box>
        <Box>Vancouver Curling Club</Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-around"
        mt={4}
        mb={2}
        className={classes.teamNames}
      >
        <div>Lighthouse</div>
        <div>vs</div>
        <div>Switzerland</div>
      </Box>
    </div>
  );
};

export default GameInfo;
