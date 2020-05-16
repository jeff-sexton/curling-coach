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

  const { currentEnd } = gameState;
  const first_team_id = gameState.ends[currentEnd].end.first_team_id;
  
  const [selectedTeamId, setSelectedTeamId] = useState(first_team_id || '');

  const [open, setOpen] = React.useState(false);

  const errorsExist = errors && errors.throw_order;
  const label = errorsExist ? "First Team required*" : "First Team*";
  
  useEffect(() => {
    // console.log(gameState);
    if (
      gameState.ends[gameState.currentEnd] &&
      !gameState.ends[gameState.currentEnd].end.first_team_id
    ) {
      handleOpen();
    }
  }, [currentEnd]);

  const teams = gameState.teams_with_players.map(
    (team, index) => {

      return (
        <MenuItem key={index} value={team.team.id}>{team.team.team_name}</MenuItem>
      );
    }
  );

  const handleOpen = () => {
    setOpen(true);
  };

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
      <FormControl variant="outlined" className={classes.formControl} error={errorsExist}>
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
