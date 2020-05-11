import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import GameInfoStyles from './GameInfoStyles';

const useStyles = makeStyles(GameInfoStyles, (theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const Location = () => {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Box>
        <TextField
          className={classes.locationField}
          id="standard-basic"
          label="Location"
        />
      </Box>
    </form>
  );
};

export default Location;
