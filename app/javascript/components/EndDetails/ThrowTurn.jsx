import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    border: 0,
    borderRadius: 3,
    width: 'fit-content'
  },
  team1Style : {
    background: theme.palette.team1Color.main,
  },
  team2Style : {
    background: theme.palette.team2Color.main,
    "& .MuiButton-label": {
      color: theme.palette.text.primary,
      },
  }
}));

const ThrowTurn = ({ gameState }) => {

  const classes = useStyles();

  const { currentEnd, currentShot, ends, teams_with_players } = gameState;

  const [playerText, setPlayerText] = useState('');
  const [player1Background, setPlayer1Background] = useState(true);

  useEffect(() => {
    const throwOrderForEnd = ends[currentEnd].end.throw_order;

    setPlayer1Background(throwOrderForEnd[currentShot].team_id === teams_with_players[0].team.id)
   
    if (
      currentShot > 1 &&
      throwOrderForEnd[currentShot].name ===
        throwOrderForEnd[currentShot - 2].name
    ) {
      setPlayerText(
        `It is ${throwOrderForEnd[currentShot].name}'s second shot`
      );
    } else {
      setPlayerText(`It is ${throwOrderForEnd[currentShot].name}'s first shot`);
    }
  }, [currentEnd, currentShot]);

  return (
    <>
      <Button
        className={`${classes.root} ${player1Background ? classes.team1Style : classes.team2Style}`}
        variant="contained"
        color="primary"
        textalign="center"
      >
        {playerText}
      </Button>
    </>
  );
};

export default ThrowTurn;
