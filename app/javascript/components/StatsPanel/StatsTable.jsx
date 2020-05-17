import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
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

const calcPercent = (count, sum) => {
  if (count) {
    return Math.round((sum / (count * 4.00)) * 10000) / 100
  }

  return '-';
}

const StatsTable = ({ stats }) => {
  const classes = useStyles();

  const rows = shotTypes.map((shotType, index) => {
    return (
      <TableRow key={index}>
        <TableCell component="th" scope="row">
          {shotType}
        </TableCell>
        <TableCell align="right">
          {stats.clockwise.count[shotType] || '-'}
        </TableCell>
        <TableCell align="right">
          {stats.clockwise.sum[shotType] || '-'}
        </TableCell>
        <TableCell align="right">
          {calcPercent(stats.clockwise.count[shotType], stats.clockwise.sum[shotType])}
        </TableCell>
        <TableCell align="right">
          {stats.counterclockwise.count[shotType] || '-'}
        </TableCell>
        <TableCell align="right">
          {stats.counterclockwise.sum[shotType] || '-'}
        </TableCell>
        <TableCell align="right">
          {calcPercent(stats.counterclockwise.count[shotType], stats.counterclockwise.sum[shotType])}
        </TableCell>
        <TableCell align="right">
          {stats.combined.count[shotType] || '-'}
        </TableCell>
        <TableCell align="right">
          {stats.combined.sum[shotType] || '-'}
        </TableCell>
        <TableCell align="right">
          {calcPercent(stats.combined.count[shotType], stats.combined.sum[shotType])}
        </TableCell>
      </TableRow>
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
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
          <TableRow>
            <TableCell component="th" scope="row">
              All Draws
            </TableCell>
            <TableCell align="right">
              {stats.clockwise.all_draws_count || '-'}
            </TableCell>
            <TableCell align="right">
              {stats.clockwise.all_draws_sum || '-'}
            </TableCell>
            <TableCell align="right">
              {calcPercent(stats.clockwise.all_draws_count, stats.clockwise.all_draws_sum)}
            </TableCell>
            <TableCell align="right">
              {stats.counterclockwise.all_draws_count || '-'}
            </TableCell>
            <TableCell align="right">
              {stats.counterclockwise.all_draws_sum || '-'}
            </TableCell>
            <TableCell align="right">
              {calcPercent(stats.counterclockwise.all_draws_count, stats.counterclockwise.all_draws_sum)}
            </TableCell>
            <TableCell align="right">
              {stats.combined.all_draws_count || '-'}
            </TableCell>
            <TableCell align="right">
              {stats.combined.all_draws_sum || '-'}
            </TableCell>
            <TableCell align="right">
              {calcPercent(stats.combined.all_draws_count, stats.combined.all_draws_sum)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              All Takeouts
            </TableCell>
            <TableCell align="right">
              {stats.clockwise.all_takeouts_count || '-'}
            </TableCell>
            <TableCell align="right">
              {stats.clockwise.all_takeouts_sum || '-'}
            </TableCell>
            <TableCell align="right">
              {calcPercent(stats.clockwise.all_takeouts_count, stats.clockwise.all_takeouts_sum)}
            </TableCell>
            <TableCell align="right">
              {stats.counterclockwise.all_takeouts_count || '-'}
            </TableCell>
            <TableCell align="right">
              {stats.counterclockwise.all_takeouts_sum || '-'}
            </TableCell>
            <TableCell align="right">
              {calcPercent(stats.counterclockwise.all_takeouts_count, stats.counterclockwise.all_takeouts_sum)}
            </TableCell>
            <TableCell align="right">
              {stats.combined.all_takeouts_count || '-'}
            </TableCell>
            <TableCell align="right">
              {stats.combined.all_takeouts_sum || '-'}
            </TableCell>
            <TableCell align="right">
              {calcPercent(stats.combined.all_takeouts_count, stats.combined.all_takeouts_sum)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Totals
            </TableCell>
            <TableCell align="right">
              {stats.clockwise.total_count || '-'}
            </TableCell>
            <TableCell align="right">
              {stats.clockwise.total_sum || '-'}
            </TableCell>
            <TableCell align="right">
              {calcPercent(stats.clockwise.total_count, stats.clockwise.total_sum)}
            </TableCell>
            <TableCell align="right">
              {stats.counterclockwise.total_count || '-'}
            </TableCell>
            <TableCell align="right">
              {stats.counterclockwise.total_sum || '-'}
            </TableCell>
            <TableCell align="right">
              {calcPercent(stats.counterclockwise.total_count, stats.counterclockwise.total_sum)}
            </TableCell>
            <TableCell align="right">
              {stats.combined.total_count || '-'}
            </TableCell>
            <TableCell align="right">
              {stats.combined.total_sum || '-'}
            </TableCell>
            <TableCell align="right">
              {calcPercent(stats.combined.total_count, stats.combined.total_sum)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatsTable;
