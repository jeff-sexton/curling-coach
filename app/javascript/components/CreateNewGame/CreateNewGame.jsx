import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
    console.log('Did this work?');
    console.log('direct location is:', location);

    const newGame = {
      date_time: '2009-03-10 01:30:00',
      location,
      completed: false,
      team1_id: 1,
      team2_id: 2,
    };
    console.log(newGame);

    axios
      .post('/api/games', newGame)
      .then((res) => {
        console.log('res.data', res.data);
        return res.data;
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
          <Button variant="contained" color="primary" onClick={onSave}>
            Start Game
          </Button>
          <FormControl
            className={classes.formControl}
            fullWidth={true}
            required={true}
          >
            <InputLabel htmlFor="team-one-select">Team One</InputLabel>
            <Select
              native
              value={teamOneId}
              onChange={(event) => setTeamOneId(event.target.value)}
              inputProps={{
                id: 'team-one-select',
              }}
              required={true}
            >
              <option aria-label="None" value="" />
              <option value={1}>Team 1</option>
              <option value={2}>Team 2</option>
              <option value={3}>Team 3</option>
            </Select>
          </FormControl>
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
