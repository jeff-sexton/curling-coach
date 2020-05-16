import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CardMedia from '@material-ui/core/CardMedia';

import ScoreBoardStyles from './ScoreBoardStyles';
import HammerIcon from '../../assets/hammer.svg';

const useStyles = makeStyles(ScoreBoardStyles);

function createTeamRow(name, score, teamId) {
  return { name, score, teamId };
}

function createEndCell(end) {
  return { end };
}

const ends = [
  createEndCell(1),
  createEndCell(2),
  createEndCell(3),
  createEndCell(4),
  createEndCell(5),
  createEndCell(6),
  createEndCell(7),
  createEndCell(8),
  createEndCell(9),
  createEndCell(10),
  createEndCell(11),
];

const ScoreBoard = ({ gameState }) => {
  const classes = useStyles();
  const endsData = gameState.ends;

  const teamOneId = gameState.teams_with_players[0].team.id;
  const teamTwoId = gameState.teams_with_players[1].team.id;

  const sum = (arr) => arr.reduce((a, b) => a + b, 0);

  const teamOneTotal = endsData.map((score) => {
    const total = score.end.score_team1;
    return total;
  });

  const teamTwoTotal = endsData.map((score) => {
    const total = score.end.score_team2;
    return total;
  });

  const teamOneName = gameState.teams_with_players[0].team.team_name;
  const teamTwoName = gameState.teams_with_players[1].team.team_name;

  const rows = [
    createTeamRow(teamOneName, sum(teamOneTotal), teamOneId),
    createTeamRow(teamTwoName, sum(teamTwoTotal), teamTwoId),
  ];
  
  const { currentEnd } = gameState;
  const firstThrowTeamId = gameState.ends[currentEnd].end.first_team_id;

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
                    {endsData[index] &&
                      rowIndex === 0 &&
                      endsData[index].end.score_team1}
                    {endsData[index] &&
                      rowIndex === 1 &&
                      endsData[index].end.score_team2}
                    {endsData[index] &&
                      rowIndex === 0 &&
                      firstThrowTeamId !== row.teamId &&
                      endsData[index].end.score_team1 === null && (
                        <CardMedia
                          image={HammerIcon}
                          className={classes.hammerIcon}
                          component="img"
                        />
                      )}
                    {endsData[index] &&
                      rowIndex === 1 &&
                      firstThrowTeamId !== row.teamId &&
                      endsData[index].end.score_team2 === null && (
                        <CardMedia
                          image={HammerIcon}
                          component="img"
                          className={classes.hammerIcon}
                        />
                      )}
                  </TableCell>
                ))}
                <TableCell className={classes.tableCell}>{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </form>
    </TableContainer>
  );
};

export default ScoreBoard;
