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

const createData = (value, type)  => {
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

const ShotType = ({ shot_type, storeShotDetails, disable, errors }) => {
  const classes = useStyles();
  const errorsExist = errors && errors.shot_type;
  const label = errorsExist ? "Type required*" : "Type*";

  const setShotType = (shot_type) => {
    storeShotDetails({shot_type});
  };

  return (
    <FormControl variant="outlined" className={classes.formControl} error={errorsExist} disabled={disable}>
      <InputLabel id="shot-type">{label}</InputLabel>
      <Select
        labelId="shot-type"
        id="shot_type"
        value={shot_type}
        onChange={(event) => setShotType(event.target.value)}
        label={label}
      >
        {shotTypes.map((shotType, i) => (
          <MenuItem key={i} value={shotType.value}>{shotType.type}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ShotType;
