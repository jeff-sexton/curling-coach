import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';


import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '56%',
    left: '59%',
    transform: 'translate(-56%, -59%)', 
  }, 
  formControl: {
    minWidth: 120,
    width: '100%',
    height: 'auto'
  }
}));

const StartEndModal = ({ gameState, startEnd, errors }) => {
  const classes = useStyles();

  const { currentEnd, ends, teams_with_players } = gameState;
  const first_team_id = ends[currentEnd].end.first_team_id;
  
  const [selectedTeamId, setSelectedTeamId] = useState(first_team_id || '');

  const [open, setOpen] = useState(false);

  const errorsExist = errors && errors.throw_order;
  const label = errorsExist ? "First Team required*" : "First Team*";
  
  useEffect(() => {
    if (currentEnd > 0 && ends[currentEnd - 1].end.score_team1) {
      if (ends[currentEnd - 1].end.score_team1 > 0) {
        startEnd(teams_with_players[1].team.id);
      } else {
        startEnd(teams_with_players[0].team.id);
      }
    } else if ( ends[currentEnd] && !first_team_id) {
        setOpen(true);
      }
  }, [currentEnd]);

  const teams = teams_with_players.map(
    (team, index) => {
      return (
        <MenuItem key={index} value={team.team.id}>{team.team.team_name}</MenuItem>
      );
    }
  );

  const handleClose = () => {
    setOpen(false);
  };

  const onSave = () => {
    startEnd(selectedTeamId);
    
    handleClose()
  };

  const body = (
    <div className={classes.paper}>
      <h2 id="setup-end">Setup End: {currentEnd + 1}</h2>
      <p id="setup-end-description">
        Select the team that is throwing first:
      </p>
      <FormControl variant="outlined" className={classes.formControl} error={errorsExist} >
      <InputLabel id="first-team">{label}</InputLabel>
      <Select
        labelId="first-team"
        id="first-team-select"
        value={selectedTeamId}
        onChange={(event) => setSelectedTeamId(event.target.value)}
        label={label}
      >
        {teams}
      </Select>
    </FormControl>
    <Button
          variant="contained"
          onClick={onSave}
          color="secondary"
          className={classes.button}
          aria-label="Move to Previous Shot"
        >
          Start End!
    </Button>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="setup-end"
        aria-describedby="setup-end-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default StartEndModal;
