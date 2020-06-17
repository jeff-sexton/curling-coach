import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  title: {
    margin: theme.spacing(0),
    fontFamily: theme.typography.fontFamily,
    borderBottom: 'black 3px solid'
  },
}));

const FinishEndModal = ({ gameState, finishEnd, startEnd, errors }) => {
  const classes = useStyles();

  const { completeEndPrompt, currentEnd } = gameState;

  const [teamScores, setTeamScores] = useState(['', '']);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (completeEndPrompt) {
      setOpen(true);
    }
  }, [completeEndPrompt]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const teamScores = [];

    const teamIndex = Number(event.target.id);
    teamScores[teamIndex] = Number(event.target.value);

    const otherTeamIndex = teamIndex === 0 ? 1 : 0;
    teamScores[otherTeamIndex] = 0;

    setTeamScores(teamScores);
  };
  
  const errorsExist = errors && errors.throw_order;
  const label = errorsExist ? 'First Team required*' : 'First Team*';

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

  const onSave = () => {
    const score_team1 = teamScores[0];
    const score_team2 = teamScores[1];
    finishEnd({ score_team1, score_team2 });
    setTeamScores(['', '']);
    handleClose();
  };

  const body = (
    <div className={classes.paper}>
      <Box display="flex" flexDirection="column" justifyContent="space-around" alignItems="center" textAlign="center" m={2}>
        <Box>
          <h2 id="finish-end" className={classes.title}>Complete End: {currentEnd + 1}</h2>
        </Box>
        <Box>
          <p id="finish-end-description">Please enter the scores for this end:</p>  
        </Box>
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
      </Box>
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
