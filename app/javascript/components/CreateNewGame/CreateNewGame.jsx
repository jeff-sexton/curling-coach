import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import DateTime from './DateTime';
import Location from './Location';
import CreateNewGameStyles from './CreateNewGameStyles';

const useStyles = makeStyles(CreateNewGameStyles, (theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const CreateNewGame = () => {
  const classes = useStyles();

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <Box pl={3} pr={3}>
          <DateTime />
          <Location />
        </Box>
      </form>
    </div>
  );
};

export default CreateNewGame;
