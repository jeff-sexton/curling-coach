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

const shotTypes = [
  { value: 'Draw', type: 'Draw' },
  { value: 'Front', type: 'Front' },
  { value: 'Guard', type: 'Guard' },
  { value: 'Raise', type: 'Raise' },
  { value: 'Wick', type: 'Wick' },
  { value: 'Freeze', type: 'Freeze' },
  { value: 'TakeOut', type: 'Take Out' },
  { value: 'HitAndRoll', type: 'Hit And Roll' },
  { value: 'Clearing', type: 'Clearing' },
  { value: 'DoubleTakeOut', type: 'Double Take Out' },
  { value: 'PromotionTakeOut', type: 'Promotion Take Out' },
  { value: 'NotScored', type: 'Not Scored' },
];

const ShotType = ({ shot_type, storeShotDetails, errors, isEditable }) => {
  const classes = useStyles();

  const [errorsExist, setErrorsExist] = useState(false);
  const [label, setLabel] = useState('Type*');

  useEffect(() => {
    if (errors && errors.shot_type) {
      setErrorsExist(true);
      setLabel('Type required*');
    } else {
      setErrorsExist(false);
    }
  }, [errors]);

  const setShotType = (shot_type) => {
    storeShotDetails({ shot_type });
  };

  const menuItems = shotTypes.map((shotType, i) => {
    return (
      <MenuItem key={i} value={shotType.value}>
        {shotType.type}
      </MenuItem>
    );
  });

  return (
    <FormControl
      variant="outlined"
      className={classes.formControl}
      error={errorsExist}
    >
      <InputLabel id="shot-type">{label}</InputLabel>
      <Select
        labelId="shot-type"
        id="shot_type"
        value={shot_type}
        onChange={(event) => setShotType(event.target.value)}
        label={label}
        disabled={!isEditable}
      >
        {menuItems}
      </Select>
    </FormControl>
  );
};

export default ShotType;
