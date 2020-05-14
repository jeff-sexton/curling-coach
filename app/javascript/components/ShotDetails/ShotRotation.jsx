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
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ShotRotation = ({ shotRotation, setShotRotation, errors }) => {
  const classes = useStyles();

  const rotationError = errors && errors.rotation ? true : false;


  const handleChange = (event) => {
    setShotRotation(event.target.value);
  };

  return (
    <FormControl required className={classes.formControl} error={rotationError}>
      <InputLabel id="shot-rotation">{rotationError && "Rotation required" || "Rotation"}</InputLabel>
      <Select
        labelId="shot-rotation"
        id="rotation"
        value={shotRotation}
        onChange={handleChange}
        displayEmpty
        className={classes.selectEmpty}
        inputProps={{ 'aria-label': 'Without label' }}
        required={true}
      >
        <MenuItem value={'clockwise'}>Clock Wise</MenuItem>
        <MenuItem value={'counterclockwise'}>Counter Clock Wise</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ShotRotation;
