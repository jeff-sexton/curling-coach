import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  totalRow: {
    borderTop: 'double',
    '& .MuiTableCell-root': {
      fontWeight: '800',
    },
  },
  allDraws: {
    borderTop: 'double',
  },
});

const shotTypes = [
  'Draw',
  'Front',
  'Guard',
  'Raise',
  'Wick',
  'Freeze',
  'TakeOut',
  'HitAndRoll',
  'Clearing',
  'DoubleTakeOut',
  'PromotionTakeOut',
];

const displaySum = (sum) => {
  if (sum || sum === 0) {
    return sum;
  }

  return '-';
};

const StatsTable = ({ stats, name }) => {
  const classes = useStyles();

  const cells = (type, rotation) => {
    if (type === 'NotScored') {
      return (
        <>
          <TableCell align="right">-</TableCell>
          <TableCell align="right">-</TableCell>
          <TableCell align="right">-</TableCell>
          <TableCell align="right">-</TableCell>
          <TableCell align="right">-</TableCell>
          <TableCell align="right">-</TableCell>
          <TableCell align="right">
            {(stats[type] && stats[type].count) || '-'}
          </TableCell>
          <TableCell align="right">-</TableCell>
          <TableCell align="right">-</TableCell>
        </>
      );
    }

    if (!stats[type] || !stats[type][rotation]) {
      return (
        <>
          <TableCell align="right">-</TableCell>
          <TableCell align="right">-</TableCell>
          <TableCell align="right">-</TableCell>
        </>
      );
    }

    return (
      <>
        <TableCell align="right">
          {stats[type][rotation].count || '-'}
        </TableCell>
        <TableCell align="right">
          {displaySum(stats[type][rotation].sum)}
        </TableCell>
        <TableCell align="right">
          {Math.round(stats[type][rotation].percent * 100) / 100}
        </TableCell>
      </>
    );
  };

  const rows = shotTypes.map((shotType, index) => {
    return (
      <TableRow key={index}>
        <TableCell component="th" scope="row">
          {shotType}
        </TableCell>
        {cells(shotType, 'clockwise')}
        {cells(shotType, 'counterclockwise')}
        {cells(shotType, 'combined')}
      </TableRow>
    );
  });

  return (
    <TableContainer
      component={Paper}
      elevation={3}
      style={{ marginTop: '30px' }}
    >
      <Typography variant="h5" style={{ textAlign: 'center' }}>
        Shot Statistics for {name}
      </Typography>
      <Table className={classes.table} aria-label="stats table">
        <TableHead>
          <TableRow>
            <TableCell>Shot Type</TableCell>
            <TableCell align="right">CW Count</TableCell>
            <TableCell align="right">CW Points</TableCell>
            <TableCell align="right">CW %</TableCell>
            <TableCell align="right">CCW Count</TableCell>
            <TableCell align="right">CCW Points</TableCell>
            <TableCell align="right">CCW %</TableCell>
            <TableCell align="right">Total Count</TableCell>
            <TableCell align="right">Total Points</TableCell>
            <TableCell align="right">Total %</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows}
          <TableRow className={classes.allDraws}>
            <TableCell component="th" scope="row">
              All Draws
            </TableCell>
            {cells('all_draws', 'clockwise')}
            {cells('all_draws', 'counterclockwise')}
            {cells('all_draws', 'combined')}
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              All Takeouts
            </TableCell>
            {cells('all_takeouts', 'clockwise')}
            {cells('all_takeouts', 'counterclockwise')}
            {cells('all_takeouts', 'combined')}
          </TableRow>
          {stats.NotScored && (
            <TableRow>
              <TableCell component="th" scope="row">
                Not Scored
              </TableCell>
              {cells('NotScored')}
            </TableRow>
          )}
          <TableRow className={classes.totalRow}>
            <TableCell component="th" scope="row">
              Totals
            </TableCell>
            {cells('total', 'clockwise')}
            {cells('total', 'counterclockwise')}
            {cells('total', 'combined')}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatsTable;
