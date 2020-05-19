import React from 'react';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import ShotMenu from './ShotMenu';
import EndMenu from './EndMenu';
import ThrowTurn from './ThrowTurn';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  team1Style : {
    background: theme.palette.team1Color.main,
  },
  team2Style : {
    // background: 'linear-gradient(to right, #ffee58, #ffdb0f)',
    background: theme.palette.team2Color.main,
    "& .MuiButton-label": {
      color: theme.palette.text.primary,
      },
  }
}));

const EndDetails = ({ gameState, setShot, setEnd }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={2} alignItems="center" >

        <Grid container item xs justify="center" >
          <Grid container item xs justify="center">
            <ShotMenu gameState={gameState} setShot={setShot} />
          </Grid>
          <Grid container item xs justify="center">
            <EndMenu gameState={gameState} setEnd={setEnd} />
          </Grid>
        </Grid>
        
        <Grid item xs style={{width: "100%"}}>
            <LinearProgress variant="determinate" value={(gameState.currentShot / 16) * 100} />
        </Grid>
        <Grid item xs>
          {gameState.ends[gameState.currentEnd].end.throw_order && <ThrowTurn gameState={gameState} classes={classes}/>}
        </Grid>
      </Grid>
    </div>
  );
}


export default EndDetails;