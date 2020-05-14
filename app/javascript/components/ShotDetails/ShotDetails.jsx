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

const ShotDetails = ({ gameState, storeShotDetails }) => {
  const classes = useStyles();

  const {rating, shot_type, rotation} = gameState.ends[gameState.currentEnd].shots[gameState.currentShot];

  const setRating = (rating) => {
    storeShotDetails({rating});
  };
  const setShotType = (shot_type) => {
    storeShotDetails({shot_type});
  };
  const setShotRotation = (rotation) => {
    storeShotDetails({rotation});
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
          <ShotType shotType={shot_type} setShotType={setShotType} />
        </Grid>

        <Grid item sm={12} className={classes.spacing}>
          <ShotRotation
            shotRotation={rotation}
            setShotRotation={setShotRotation}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ShotDetails;
