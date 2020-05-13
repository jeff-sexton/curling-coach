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

function createData(value, type) {
  return { value, type };
}

const shotTypes = [
  createData('Draw', 'Draw'),
  createData('Front', 'Front'),
  createData('Guard', 'Guard'),
  createData('Raise', 'Raise'),
  createData('Wick', 'Wick'),
  createData('Freeze', 'Freeze'),
  createData('TakeOut', 'Take Out'),
  createData('HitAndRoll', 'Hit And Roll'),
  createData('Clearing', 'Clearing'),
  createData('DoubleTakeOut', 'Double Take Out'),
  createData('PromotionTakeOut', 'Promotion Take Out'),
  createData('NotScored', 'Not Scored'),
];

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
        required={true}
      >
        {shotTypes.map((shotType, i) => (
          <MenuItem key={i} value={shotType.value}>{shotType.type}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ShotType;
