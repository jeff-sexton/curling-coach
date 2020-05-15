import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

import ScoreBoardStyles from './ScoreBoardStyles';

const useStyles = makeStyles(ScoreBoardStyles);

function createData(name) {
  return { name };
}

function createData1(end) {
  return { end };
}

const ends = [
  createData1(1),
  createData1(2),
  createData1(3),
  createData1(4),
  createData1(5),
  createData1(6),
  createData1(7),
  createData1(8),
  createData1(9),
  createData1(10),
  createData1(11),
];

const endTest = [
  {
    id: 11,
    score_team1: 1,
    score_team2: 2,
    game_id: 2,
  },
  {
    id: 12,
    score_team1: 3,
    score_team2: 4,
    game_id: 2,
  },
  {
    id: 13,
    score_team1: 5,
    score_team2: 6,
    game_id: 2,
  },
  {
    id: 14,
    score_team1: 7,
    score_team2: 8,
    game_id: 2,
  },
  {
    id: 15,
    score_team1: 9,
    score_team2: 10,
    game_id: 2,
  },
]

const ScoreBoard = ({ gameState }) => {
  const classes = useStyles();

  const team1Name = gameState.teams_with_players[0].team.team_name;
  const Team2Name = gameState.teams_with_players[1].team.team_name;
  const rows = [createData(team1Name), createData(Team2Name)];
  
  console.log('gameState: ', gameState); 
  // console.log('gameState.ends: ', gameState.ends[0].end.score_team1); 
  // ^ path to get each end score
  return (
    <TableContainer>
      <form noValidate autoComplete="off">
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.letterSpace}>
              <TableCell className={classes.ends}></TableCell>
              {ends.map((endNumber) => (
                <TableCell className={classes.ends} key={endNumber.end}>
                  {endNumber.end}
                </TableCell>
              ))}
              <TableCell className={classes.ends}>TOTAL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.teamNameRow}>
            {rows.map((row, rowIndex) => (
              <TableRow key={row.name}>
                <TableCell
                  id={row.name}
                  component="th"
                  scope="row"
                  className={classes.teamName}
                >
                  {row.name}
                </TableCell>
                {ends.map((endNumber, index) => (
                  <TableCell className={classes.tableCell} key={endNumber.end}>
                    {endTest[index] && rowIndex === 0 && endTest[index].score_team1}
                    {endTest[index] && rowIndex === 1 && endTest[index].score_team2}
                  </TableCell>
                ))}
                <TableCell className={classes.tableCell}></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </form>
    </TableContainer>
  );
};

export default ScoreBoard;
