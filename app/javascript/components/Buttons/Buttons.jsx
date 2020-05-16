import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    display: "flex",
    justifyContent: "space-around",
  },
}));

const Buttons = ({ saveShot, handleEdit, endGame, isEditable }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root} mt={1}>
      {isEditable &&
      <Button variant="contained" color="secondary" onClick={saveShot} >
        SAVE
      </Button>
      }
      {!isEditable && 
      <Button variant="contained" color="secondary" onClick={handleEdit} >
        Edit
      </Button>
      }
      <Button variant="contained" color="primary" onClick={endGame}>
        GAME END
      </Button>
    </Box>
  );
}

export default Buttons