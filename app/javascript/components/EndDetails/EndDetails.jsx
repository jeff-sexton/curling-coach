import React from 'react';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';
import EndMenu from './EndMenu';
import LinearProgress from '@material-ui/core/LinearProgress';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

const EndDetails = ({ gameState }) => {
  const classes = useStyles();
 
  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={2} alignItems="center" >

        <Grid item xs>
           <EndMenu ends={gameState.ends} />
        </Grid>

        <Grid item xs style={{width: "100%"}}>
            <LinearProgress variant="determinate" value={(gameState.currentShot / 16) * 100} />
        </Grid>

        <Grid item xs>
           <Paper className={classes.paper}>
            Current Player {gameState.currentShot}
           </Paper> 
        </Grid>

      </Grid>
    </div>
  );
}


export default EndDetails;