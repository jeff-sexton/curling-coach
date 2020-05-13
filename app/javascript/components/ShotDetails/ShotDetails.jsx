import React, { useState } from 'react';
import ShotRating from './ShotRating';
import ShotType from './ShotType';
import ShotRotation from './ShotRotation';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  spacingTopBottom: {
    '&.MuiGrid-item': {
      padding: '0 12px',
    },
    "& .MuiFormHelperText-root": {
      display: "none",
    },
  },
  spacing: {
    '&.MuiGrid-item': {
      padding: "10px 12px",
    },
  },
  marginTop: {
    marginTop: 0,
  }
}));

const ShotDetails = ({shotDetails, setShotDetails}) => {
  const classes = useStyles();

  const {rating, shotType, shotRotation} = shotDetails;

  const setRating = (rating) => {
    setShotDetails(prev => ({...prev, rating}));
  };
  const setShotType = (shotType) => {
    setShotDetails(prev => ({...prev, shotType}));
  };
  const setShotRotation = (shotRotation) => {
    setShotDetails(prev => ({...prev, shotRotation}));
  };

  // const [rating, setRating] = useState('');
  // const [shotType, setShotType] = useState('');
  // const [shotRotation, setShotRotation] = useState('');

  return (
    <div className={classes.root}>
      <h3 className={classes.marginTop}>Shot Details</h3>
      <Grid container>
        <Grid item xs={12} sm={5} className={classes.spacingTopBottom}>
          <ShotRating rating={rating} setRating={setRating} />
        </Grid>

        <Grid item xs={12} sm={7} className={classes.spacingTopBottom}>
          <ShotType shotType={shotType} setShotType={setShotType} />
        </Grid>

        <Grid item sm={12} className={classes.spacing}>
          <ShotRotation
            shotRotation={shotRotation}
            setShotRotation={setShotRotation}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ShotDetails;
