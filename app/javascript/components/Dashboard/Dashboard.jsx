import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import GamePreview from './GamePreview';

const useStyles = makeStyles(() => ({
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
}));

const Dashboard = ({ handleGameSelection, handleStatsSelection, gameList }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1> Dashboard </h1>
      {gameList.map((game) => (
        <GamePreview key={game.id} handleGameSelection={handleGameSelection} handleStatsSelection={handleStatsSelection} game={game} />
      ))}
    </div>
  );
};

export default Dashboard;
