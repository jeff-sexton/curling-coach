import React from 'react';
import ShotRating from './ShotRating';
import ShotType from './ShotType';
import ShotRotation from './ShotRotation';
import Button from '@material-ui/core/Button';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },
  button: {
    marginTop: theme.spacing(1.5),
  },
}));

const ShotDetails = ({
  gameState,
  storeShotDetails,
  isEditable,
  handleStatsClick,
}) => {
  const classes = useStyles();
  const { rating, shot_type, rotation } = gameState.ends[
    gameState.currentEnd
  ].shots[gameState.currentShot];

  return (
    <div className={classes.root}>
      <Box display="flex" justifyContent="space-around">
        <Box>
          <h3>Shot Details</h3>
        </Box>
        <Box>
          <Button
            variant="contained"
            onClick={handleStatsClick}
            color="secondary"
            className={classes.button}
            aria-label="Go to game statistics"
            // disabled={currentShot <= 1}
          >
            Stats
            <EqualizerIcon />
          </Button>
        </Box>
      </Box>

      <Grid container item justify={'center'} spacing={2}>
        <Grid item xs={12}>
          <ShotType
            shot_type={shot_type}
            storeShotDetails={storeShotDetails}
            errors={gameState.shotSaveErrors}
            isEditable={isEditable}
          />
        </Grid>
        <Grid item xs={6}>
          <ShotRating
            rating={rating}
            storeShotDetails={storeShotDetails}
            errors={gameState.shotSaveErrors}
            isEditable={isEditable}
          />
        </Grid>
        <Grid item xs={6}>
          <ShotRotation
            rotation={rotation}
            storeShotDetails={storeShotDetails}
            errors={gameState.shotSaveErrors}
            isEditable={isEditable}
          />
        </Grid>

      </Grid>
    </div>
  );
};

export default ShotDetails;
