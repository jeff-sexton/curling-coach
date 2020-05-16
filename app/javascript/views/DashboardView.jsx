import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import axios from 'axios';

import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import LoadingIcon from '../assets/Loading_icon.svg';

const DashboardView = ({ handleGameSelection }) => {
  const [gameList, setGameList] = useState([]);
  const [dashboardLoaded, setDashboardLoaded] = useState(false);

  useEffect(() => {
    axios.get(`/api/games`).then((res) => {
      setGameList(res.data);
      setDashboardLoaded(true);
    });
  }, []);

  const useStyles = makeStyles({
    card: {
      maxWidth: '20%',
    },
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

  const classes = useStyles();

  return (
    <div>
      {dashboardLoaded && (
        <Dashboard
          handleGameSelection={handleGameSelection}
          gameList={gameList}
        />
      )}

      {!dashboardLoaded && (
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
      )}
    </div>
  );
};

export default DashboardView;
