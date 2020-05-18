import React from 'react';

import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';

import LoadingIcon from '../../assets/Loading_icon.svg';

const useStyles = makeStyles({
  loadingBox: {
    width: '40%',
    margin: 'auto',
    textAlign: 'center',
  },
  root: {
    width: '100%',
    position: 'relative',
    animation: '$animation 3s infinite',
    animationTimingFunction: 'linear',
  },
  '@keyframes animation': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
});

const Loading = () => {
  const classes = useStyles();

  return (
    <Box
      className={classes.loadingBox}
      display="flex"
      flexDirection="column"
    >
      <Box>
        <h1>LOADING</h1>
      </Box>
      <Box>
        <CardMedia
          image={LoadingIcon}
          component="img"
          classes={{ root: classes.root }}
        />
      </Box>
    </Box>
  );
};

export default Loading;
