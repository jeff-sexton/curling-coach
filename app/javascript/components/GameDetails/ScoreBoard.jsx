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

const rows = [createData('Canada'), createData('Switzerland')];

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

const ScoreBoard = () => {
  const classes = useStyles();
  const [score, setScore] = useState();

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
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell
                  id={row.name}
                  component="th"
                  scope="row"
                  className={classes.teamName}
                >
                  {row.name}
                </TableCell>
                {ends.map((endNumber) => (
                  <TableCell className={classes.tableCell} key={endNumber.end}>
                    <TextField
                      end={endNumber.end}
                      inputProps={{ type: 'number', id: `${endNumber.end}` }}
                      className={`${classes.root} ${classes.textInput}`}
                      value={score}
                      onChange={(event) => setScore(event.target.value)}
                    />
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
