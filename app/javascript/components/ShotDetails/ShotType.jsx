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
  createData('draw', 'Draw'),
  createData('front', 'Front'),
  createData('guard', 'Guard'),
  createData('raise', 'Raise'),
  createData('wick', 'Wick'),
  createData('freeze', 'Freeze'),
  createData('takeOut', 'Take Out'),
  createData('hitAndRoll', 'Hit And Roll'),
  createData('clearing', 'Clearing'),
  createData('doubleTakeOut', 'Double Take Out'),
  createData('promotionTakeOut', 'Promotion Take Out'),
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
