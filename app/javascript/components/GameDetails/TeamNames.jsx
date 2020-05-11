import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import GameInfoStyles from './GameInfoStyles';

const useStyles = makeStyles(GameInfoStyles);

const TeamNames = () => {
  const classes = useStyles();

  return (
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
  );
};

export default TeamNames;
