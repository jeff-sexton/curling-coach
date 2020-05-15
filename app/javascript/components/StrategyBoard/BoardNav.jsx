import React from 'react';

import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1.5),
  },
}));

const BoardNav = ({ onNext, onPrev, currentShot, isEditable }) => {
  const classes = useStyles();

  return (
    <Box display="flex" justifyContent='center' width="100%">
      <Box>
        <Button
          variant="contained"
          onClick={onPrev}
          color="secondary"
          className={classes.button}
          aria-label="Move to Previous Shot"
          disabled={currentShot <= 0}
        >
          <NavigateBeforeIcon />
        </Button>
      </Box>

      <Box>
        <Button
          variant="contained"
          onClick={onNext}
          color="secondary"
          className={classes.button}
          aria-label="Move to Next Shot"
          disabled={isEditable}
        >
          <NavigateNextIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default BoardNav;
