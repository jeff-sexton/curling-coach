import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  locationField: {
    width: '100%',
  },
}));

const Location = ({ location, setLocation }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <TextField
      className={classes.locationField}
      id="game-location"
      label="Location"
      value={location}
      onChange={handleChange}
    />
  );
};

export default Location;
