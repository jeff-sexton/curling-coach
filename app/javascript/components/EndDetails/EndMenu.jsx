import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Grid';
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
    padding: "1%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  listItem: {
    background: 'linear-gradient(to right, #42a5f5, #4dd0e1)',
    '&.Mui-selected, &:hover' : {
      background: "white",
      color: "black",
      border: "1px solid black"
    },
    borderRadius: 5,
    color: "white",
    fontWeight: "bolder",
    width: "100%",
    marginBottom: '5%'
  },  
}));


const EndMenu = ({ gameState, setEnd }) => {
  const { ends, currentEnd, currentShot } = gameState;
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const endItemClick = (index) => {
    setEnd(index);
    setOpen(false);
  }
  const endItems = ends.map((value, index) => {
    return (
        <MenuItem 
          className={classes.listItem}
          key={index} 
          selected={index === currentEnd}
          onClick={() => endItemClick(index)}
        >
          End {index + 1}
        </MenuItem> 
    );
  })

  const modalContent = (
    <Paper className={classes.paper}>
       <Box 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
      >
          {endItems}
      </Box>
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