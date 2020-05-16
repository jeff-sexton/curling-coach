import React from 'react';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import GamePreviewStyles from './GamePreviewStyles';

const useStyles = makeStyles(GamePreviewStyles);

const GamePreview = ({ handleGameSelection, handleStatsSelection, game }) => {
  const classes = useStyles();

  const momentDate = moment(game.date_time);
  const formattedDate = momentDate.format('LL');
  const formattedDay = momentDate.format('ddd');
  const formattedTime = momentDate.format('LT');

  const handleGameClick = () => {
    handleGameSelection(game.id);
  };

  const handleStatsClick = () => {
    handleStatsSelection(game.id);
  }

  return (
    <Box display="flex" justifyContent="space-between" mb={3}>
      <Box
        className={classes.root}
        flexGrow={2}
        display="flex"
        justifyContent="space-between"
        onClick={handleGameClick}
      >
        <Box
          className={classes.details}
          flexGrow={2}
          p={2}
          display="flex"
          justifyContent="space-between"
        >
          <Typography component="h5" variant="h5">
            {game.teams[0].team_name} vs {game.teams[1].team_name}
          </Typography>
          <Typography component="h6" variant="h6">
            {game.location}
          </Typography>
        </Box>
        <Box
          p={2}
          flexGrow={1}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          textAlign="right"
        >
          <Typography variants="subtitle1" color="textSecondary">
            {formattedDay}, {formattedDate}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {formattedTime}
          </Typography>
        </Box>
      </Box>
      <Box flexGrow={0.5} ml={1}>
        <Button
          className={classes.button}
          variant="contained"
          width="100%"
          color="secondary"
          onClick={handleStatsClick}
        >
          Stats
        </Button>
      </Box>
    </Box>
  );
};

export default GamePreview;
