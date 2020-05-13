import React from 'react';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import ProgressBar from './ProgressBar';
import { makeStyles } from '@material-ui/core/styles';
import EndMenu from './EndMenu';

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

const EndDetails = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item xs={6} >
          <Paper className={classes.paper}>
           End Info
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <ProgressBar currentShot={7} />  
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Current Player is </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Currently on Shot / 16</Paper>
        </Grid>
        <Grid item xs={4}>
            <EndMenu />
        </Grid>
      </Grid>
    </div>
  );
}


export default EndDetails;