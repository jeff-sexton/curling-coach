import React, { useState } from 'react';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import DateTime from './DateTime';
import Location from './Location';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 'auto',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const CreateNewGame = ({ open, handleClose }) => {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [location, setLocation] = useState('');

  const body = (
    <div datatag={'here'} className={classes.paper}>
      <form className={classes.root} noValidate autoComplete="off">
        <Box pl={3} pr={3}>
          <DateTime
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <Location location={location} setLocation={setLocation} />
        </Box>
      </form>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="new-game"
      aria-describedby="new-game-description"
    >
      {body}
    </Modal>
  );
};

export default CreateNewGame;
