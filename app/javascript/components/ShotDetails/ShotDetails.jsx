import React, { useState } from 'react';
import ShotRating from './ShotRating';
import ShotType from './ShotType';
import ShotRotation from './ShotRotation'

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const ShotDetails = () => {
  const classes = useStyles();

  const [rating, setRating] = useState('');
  const [shotType, setShotType] = useState('')
  const [shotRotation, setShotRotation] = useState('')

  return (
    <div className={classes.root}>
      <h3>Shot Details</h3>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <ShotRating rating={rating} setRating={setRating} />
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <ShotType shotType={shotType} setShotType={setShotType} />
        </Grid>

        <Grid item xs={12} sm={4}>
          <ShotRotation shotRotation={shotRotation} setShotRotation={setShotRotation}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default ShotDetails;
