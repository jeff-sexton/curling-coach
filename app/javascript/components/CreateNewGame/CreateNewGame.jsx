import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import DateTime from './DateTime';
import Location from './Location';
import TeamSelector from './TeamSelector';
import TeamAutoComplete from './TeamAutoComplete';

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

const CreateNewGame = ({ open, handleClose, handleGameSelection }) => {
  const classes = useStyles();
  const [teamList, setTeamList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [location, setLocation] = useState('');
  const [teamOneId, setTeamOneId] = useState();
  const [teamTwoId, setTeamTwoId] = useState();

  useEffect(() => {
    axios.get(`/api/teams`).then((res) => {
      setTeamList(res.data);
    });
  }, []);

  const onSave = () => {
    const newGame = {
      date_time: selectedDate,
      location,
      completed: false,
      team1_id: teamOneId,
      team2_id: teamTwoId,
    };

    axios
      .post('/api/games', newGame)
      .then((res) => {
        console.log('res.data', res.data);
        handleClose()
        handleGameSelection(res.data.id);
      })
      .catch((err) => {
        console.err(err);
      });
  };

  const body = (
    <div datatag={'here'} className={classes.paper}>
      <form className={classes.root} noValidate autoComplete="off">
        <Box pl={3} pr={3}>
          <DateTime
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <Location location={location} setLocation={setLocation} />
          <TeamSelector
            teamNumber="one"
            teamId={teamOneId}
            setTeamId={setTeamOneId}
            teamList={teamList}
          />
          <TeamSelector
            teamNumber="two"
            teamId={teamTwoId}
            setTeamId={setTeamTwoId}
            teamList={teamList}
          />
          <TeamAutoComplete />
          <Button variant="contained" color="primary" onClick={onSave}>
            Start Game
          </Button>
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
