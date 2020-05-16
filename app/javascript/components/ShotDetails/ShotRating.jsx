import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    width: '100%',
    height: 'auto'
  }
}));

const ShotRating = ({ rating, storeShotDetails, disable, errors }) => {
  const classes = useStyles();
  const errorsExist = errors && errors.rating;
  const label = errorsExist ? "Rating required*" : "Rating*";
  
  const setRating = (rating) => {
    storeShotDetails({rating});
  };
  
  return (
    <FormControl variant="outlined" className={classes.formControl} error={errorsExist} disabled={disable}>
      <InputLabel id="shot-rating">{label}</InputLabel>
      <Select
        labelId="shot-rating"
        id="rating"
        value={rating}
        onChange={(event) => setRating(event.target.value)}
        label={label}
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

