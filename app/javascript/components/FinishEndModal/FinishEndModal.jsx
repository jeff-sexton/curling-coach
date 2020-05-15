import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const FinishEndModal = ({ gameState, finishEnd, errors }) => {
  const classes = useStyles();

  const { currentEnd, completeEndPrompt } = gameState;

  const [teamScores, setTeamScores] = useState(['', '']);

  const [open, setOpen] = React.useState(false);

  const errorsExist = errors && errors.throw_order;
  const label = errorsExist ? 'First Team required*' : 'First Team*';

  useEffect(() => {
    if (completeEndPrompt) {
      handleOpen();
    }
  }, [completeEndPrompt]);

  const handleChange = (event) => {
    console.log('key', event.target.id);
    console.log('value', event.target.value);

    const teamIndex = Number(event.target.id);

    const teamScores = [];
    teamScores[teamIndex] = Number(event.target.value);

    let otherTeamIndex = teamIndex + 1;
    if (otherTeamIndex > 1) {
      otherTeamIndex = 0;
    }

    teamScores[otherTeamIndex] = 0;
    setTeamScores(teamScores);
  };

  const teams = gameState.teams_with_players.map((team, index) => {
    return (
      <TextField
        key={index}
        onChange={handleChange}
        value={teamScores[index]}
        id={`${index}`}
        label={team.team.team_name}
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
    );
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSave = () => {
    const score_team1 = teamScores[0];
    const score_team2 = teamScores[1];
    finishEnd({ score_team1, score_team2 });

    handleClose();
  };

  const body = (
    <div className={classes.paper}>
      <h2 id="finish-end">Complete End: {currentEnd + 1}</h2>
      <p id="finish-end-description">Please enter the scores for this end:</p>
      <form className={classes.root} noValidate autoComplete="off">
        {teams}
      </form>

      <Button
        variant="contained"
        onClick={onSave}
        color="secondary"
        className={classes.button}
        aria-label="Save Scores"
      >
        Save
      </Button>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="finish-end"
        aria-describedby="finish-end-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default FinishEndModal;