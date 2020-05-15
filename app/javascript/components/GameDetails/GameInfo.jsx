import React from 'react';
import moment from 'moment';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import GameInfoStyles from './GameInfoStyles';

const useStyles = makeStyles(GameInfoStyles);

const GameInfo = ({ gameState }) => {
  const classes = useStyles();

  const momentDate = moment(gameState.date_time);
  const formattedDateAndDay = momentDate.format('dddd, MMMM Do, YYYY');
  const formattedTime = momentDate.format('LT');

  return (
    <div>
      <Box textAlign="center" className={classes.gameInfo} mb={1}>
        <Box mb={1}>
          {formattedDateAndDay} | {formattedTime}
        </Box>
        <Box>{gameState.game.location}</Box>
      </Box>
    </div>
  );
};

export default GameInfo;
