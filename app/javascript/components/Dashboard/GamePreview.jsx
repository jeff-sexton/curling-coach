import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import GamePreviewStyles from './GamePreviewStyles';

const useStyles = makeStyles(GamePreviewStyles, (theme) => ({
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

const GamePreview = ({onClick}) => {
  const classes = useStyles();

  return (
    <Box display="flex" justifyContent="space-between" mb={3}>
      <Box
        className={classes.root}
        flexGrow={2}
        display="flex"
        justifyContent="space-between"
        onClick={onClick}
      >
        <Box
          className={classes.details}
          flexGrow={2}
          p={2}
          display="flex"
          justifyContent="space-between"
        >
          <Typography component="h5" variant="h5">
            Team 1 vs Team 2
          </Typography>
          <Typography component="h6" variant="h6">
            Vancouver Curling Club
          </Typography>
        </Box>
        <Box
          p={2}
          flexGrow={1}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          textAlign="right"
        >
          <Typography variants="subtitle1" color="textSecondary">
            Friday, May 1st, 2020
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            7PM
          </Typography>
        </Box>
      </Box>
      <Box flexGrow={0.5} ml={1}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          width="100%"
        >
          Stats
        </Button>
      </Box>
    </Box>
  );
};

export default GamePreview;
