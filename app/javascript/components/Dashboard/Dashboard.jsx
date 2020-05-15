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

const Dashboard = ({ onClick, gameList }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1> Dashboard </h1>
      {gameList.map((game) => (
        <GamePreview key={game.id} game={game} onClick={onClick} />
      ))}
    </div>
  );
};

export default Dashboard;
