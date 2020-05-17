import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    width: '100%',
    height: 'auto',
  },
}));

const ShotRating = ({ rating, storeShotDetails, errors, isEditable }) => {
  const classes = useStyles();

  const [errorsExist, setErrorsExist] = useState(false);
  const [label, setLabel] = useState('Rating*');

  useEffect(() => {
    if (errors && errors.rating) {
      setErrorsExist(true);
      setLabel('Rating required*');
    } else {
      setErrorsExist(false);
    }
  }, [errors]);

  const setRating = (rating) => {
    storeShotDetails({ rating });
  };

  return (
    <FormControl
      variant="outlined"
      className={classes.formControl}
      error={errorsExist}
    >
      <InputLabel id="shot-rating">{label}</InputLabel>
      <Select
        labelId="shot-rating"
        id="rating"
        value={rating}
        onChange={(event) => setRating(event.target.value)}
        label={label}
        disabled={!isEditable}
      >
        <MenuItem value={0}>0</MenuItem>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ShotRating;
