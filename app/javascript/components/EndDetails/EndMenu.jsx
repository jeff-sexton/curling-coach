import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: "42a5f5",
    border: 0,
    borderRadius: 3,
    color: 'white',
    width: "80%",
  },
  paper: {
    width: "auto",
    height: "auto",
    backgroundColor: theme.palette.background.paper,
    border: '4px solid #FF0000',
    padding: "1%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  listItem: {
    background: '#42a5f5',
    textAlign: "center",
    borderRadius: 5,
    '&.Mui-selected, &:hover' : {
      background: "red"
    },
    color: "white",
    fontSize: "20",
    fontWeight: "bolder",
    width: "fit-content"
  },  
}));


const EndMenu = ({ gameState, setEnd }) => {
  const { ends, currentEnd, currentShot } = gameState;
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const endItemSpacing = () => {
    if (ends.length <= 2) {
      return 12 / ends.length;
    }
    return 4;
  }


  const endItemClick = (index) => {
    setEnd(index);
    setOpen(false);
  }
  const endItems = ends.map((value, index) => {
    return (
      <Grid container item xs={endItemSpacing()} key={index} justify="center" >
        <MenuItem 
          className={classes.listItem}
          key={index} 
          selected={index === currentEnd}
          onClick={() => endItemClick(index)}
        >
          End {index + 1}
        </MenuItem>
      </Grid>   
    );
  })

  const modalContent = (
    <Paper className={classes.paper}>
      <Grid container spacing={2} justify="flex-start" alignItems="center" alignText="center"  >
          {endItems}
      </Grid>
    </Paper>
  );

  return (
    <>
    <Button 
      className={classes.root}
      variant="contained"
      color="primary"
      onClick={() => setOpen(true)} 
    >
      {`End ${currentEnd + 1}`}
    </Button>
    <Modal
      open={open}
      onClose={() => setOpen(false)}
    >
      {modalContent}
    </Modal>
</>
  );
}

export default EndMenu;