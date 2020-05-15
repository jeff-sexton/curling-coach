import React from 'react';
import ShotRating from './ShotRating';
import ShotType from './ShotType';
import ShotRotation from './ShotRotation';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center"
  }
}));

const ShotDetails = ({ gameState, storeShotDetails }) => {
  const classes = useStyles();
  const {rating, shot_type, rotation} = gameState.ends[gameState.currentEnd].shots[gameState.currentShot];

  return (
    <div className={classes.root}>

      <h3>Shot Details</h3>

    <Grid container item justify={"center"} spacing={2}>
      <Grid item xs={12}>
        <ShotType shot_type={shot_type} storeShotDetails={storeShotDetails} errors={gameState.shotSaveErrors} />
      </Grid>
      <Grid item xs={6}>  
        <ShotRating rating={rating} storeShotDetails={storeShotDetails}  errors={gameState.shotSaveErrors} />
      </Grid>
      <Grid item xs={6}>
        <ShotRotation rotation={rotation} storeShotDetails={storeShotDetails} errors={gameState.shotSaveErrors} />
      </Grid>
    </Grid>
    </div>
  );
};

export default ShotDetails;
