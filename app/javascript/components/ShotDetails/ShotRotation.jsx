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

const ShotRotation = ({ rotation, storeShotDetails, errors }) => {
  const classes = useStyles();

  const errorsExist = errors && errors.rotation;
  const label = errorsExist ? "Rotation required*" : "Rotation*";

  const setShotRotation = (rotation) => {
    storeShotDetails({rotation});
  };

  return (
    <FormControl variant="outlined" className={classes.formControl} error={errorsExist}>
      <InputLabel id="shot-rotation">{label}</InputLabel>
      <Select
        labelId="shot-rotation"
        id="rotation"
        value={rotation}
        onChange={(event) => setShotRotation(event.target.value)}
        label={label}
      >
        <MenuItem value={'clockwise'}>Clockwise</MenuItem>
        <MenuItem value={'counterclockwise'}>Counterclockwise</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ShotRotation;
