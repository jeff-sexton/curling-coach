import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// Draw Front Guard Raise Wick Freeze TakeOut HitAndRoll Clearing DoubleTakeOut PromotionTakeOut
const ShotType = ({ shotType, setShotType }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    setShotType(event.target.value);
  };

  return (
    <FormControl required className={classes.formControl}>
      <InputLabel id="shot-type">Type</InputLabel>
      <Select
        labelId="shot-type"
        id="shot_type"
        value={shotType}
        onChange={handleChange}
        displayEmpty
        className={classes.selectEmpty}
        inputProps={{ 'aria-label': 'Without label' }}
      >

        <MenuItem value={'draw'}>Draw</MenuItem>
        <MenuItem value={'hit'}>Hit</MenuItem>
        <MenuItem value={'take out'}>Take Out</MenuItem>
        <MenuItem value={'raise'}>Raise</MenuItem>
      </Select>
      <FormHelperText>Required</FormHelperText>
    </FormControl>
  );
};

export default ShotType;
