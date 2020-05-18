import React, { useState, useEffect } from 'react';
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

const ScoreBoard = ({ gameState }) => {
  const classes = useStyles();
  const { ends, currentEnd, teams_with_players } = gameState;

  const endNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const [rows, setRows] = useState([]);

  const sum = (arr) => arr.reduce((a, b) => a + b, 0);

  useEffect(() => {
    setRows(teams_with_players.map((teams, index) => {
      return { 
        name: teams.team.team_name, 
        score: sum(ends.map(score => score.end[`score_team${index + 1}`])), 
        teamId: teams.team.id };    
      }
    ))
  }, [currentEnd])

  return (
    <TableContainer>
      <form noValidate autoComplete="off">
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.letterSpace}>
              <TableCell className={classes.ends}></TableCell>
              {endNumbers.map((endNumber) => (
                <TableCell className={classes.ends} key={endNumber}>
                  {endNumber}
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
                {endNumbers.map((endNumber, index) => (
                  <TableCell className={classes.tableCell} key={endNumber}>
                    {ends[index] && 
                     ends[index].end[`score_team${rowIndex + 1}`]} 
                   
                    {ends[index] && 
                     !ends[index + 1] &&
                     ends[index].end.first_team_id !== row.teamId &&
                     ends[index].end.throw_order && (
                      <CardMedia
                        image={HammerIcon}
                        className={classes.hammerIcon}
                        component="img"
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
