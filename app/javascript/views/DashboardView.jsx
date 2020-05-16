import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import axios from 'axios';

import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import LoadingIcon from '../assets/icon.svg';

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
    test: {
      width: 250,
      position: 'relative',
      animation: '$animation 5s infinite',
    },
    root: {
      width: 150,
    },
    '@keyframes animation': {
      from: { left: -10 },
      to: { left: '70%' },
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
          className={classes.test}
          display="flex"
          justifyContent="start"
          alignItems="center"
        >
          <Box>
            <h2>LOADING</h2>
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