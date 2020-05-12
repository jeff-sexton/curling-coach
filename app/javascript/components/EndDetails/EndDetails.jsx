import React from 'react';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import ProgressBar from './ProgressBar';
import { makeStyles } from '@material-ui/core/styles';
import ThrowOrderList from './ThrowOrderList'

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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h4>End Info</h4>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <ThrowOrderList/>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        
        <Grid item xs={12}>
          <ProgressBar end={7} currentShot={15} />  
        </Grid>
      </Grid>
    </div>
      
    
  //  <div>
  //    <Grid container spacing={2}>
  //     <Grid item width="50%">
  //       <h3>End Info</h3>
  //     </Grid>
  //     <Grid item width="50%">
  //     <h3>End Info</h3>
  //     </Grid>
  //    </Grid>

      /* <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center">
        <Box bgcolor="red" color="primary.contrastText" borderRadius={16} width={1/4} height={1/5} textAlign="center">
        <h3>End Info</h3>
        </Box>

          <ProgressBar end={7} currentShot={15} />
       
      </Box> */
    
   // </div>
  );
}


export default EndDetails;