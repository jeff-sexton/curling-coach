import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import GamePreview from './GamePreview';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      // margin: theme.spacing(1),
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: 'auto',
    maxWidth: 800,
  },
  title: {
    fontFamily: theme.typography.h1.fontFamily,
  },
}));

const Dashboard = ({ handleGameSelection, handleStatsSelection, gameList }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box textAlign="center" mt={2} mb={2}>
        <h1 className={classes.title}> DASHBOARD </h1>
      </Box>
      {gameList.map((game) => (
        <GamePreview
          key={game.id}
          handleGameSelection={handleGameSelection}
          handleStatsSelection={handleStatsSelection}
          game={game}
        />
      ))}
    </div>
  );
};

export default Dashboard;
