import React from 'react';
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

const rows = [createData('Canada'), createData('Switzerland')];

const ScoreBoard = () => {
  const classes = useStyles();

  return (
    <TableContainer>
      <form noValidate autoComplete="off">
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.ends}></TableCell>
              <TableCell className={classes.ends}>1</TableCell>
              <TableCell className={classes.ends}>2</TableCell>
              <TableCell className={classes.ends}>3</TableCell>
              <TableCell className={classes.ends}>4</TableCell>
              <TableCell className={classes.ends}>5</TableCell>
              <TableCell className={classes.ends}>6</TableCell>
              <TableCell className={classes.ends}>7</TableCell>
              <TableCell className={classes.ends}>8</TableCell>
              <TableCell className={classes.ends}>9</TableCell>
              <TableCell className={`${classes.ends} ${classes.letterSpace}`}>
                10
              </TableCell>
              <TableCell className={`${classes.ends} ${classes.letterSpace}`}>
                11
              </TableCell>
              <TableCell className={classes.ends}>TOTAL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.teamNameRow}>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.teamName}
                >
                  {row.name}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <TextField inputProps={{ type: 'number' }} classes={{ root: classes.textInput }} />
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <TextField inputProps={{ type: 'number' }} />
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <TextField inputProps={{ type: 'number' }} />
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <TextField inputProps={{ type: 'number' }} />
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <TextField inputProps={{ type: 'number' }} />
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <TextField inputProps={{ type: 'number' }} />
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <TextField inputProps={{ type: 'number' }} />
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <TextField inputProps={{ type: 'number' }} />
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <TextField inputProps={{ type: 'number' }} />
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <TextField inputProps={{ type: 'number' }} />
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <TextField inputProps={{ type: 'number' }} />
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <TextField inputProps={{ type: 'number' }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </form>
    </TableContainer>
  );
};

export default ScoreBoard;
