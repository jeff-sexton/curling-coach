import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import axios from 'axios';

import StatsPanel from '../components/StatsPanel';

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const StatsView = ({ gameId }) => {
  const classes = useStyles();

  const [stats, setStats] = useState([]);

  useEffect(() => {
    if (gameId) {
      axios
        .get(`api/stats/${gameId}`)
        .then((res) => {
          console.log(res.data);
          setStats(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [gameId]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <h1>Stats for Game: {gameId}</h1>
      {stats.length > 0 && (
        <>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label={stats[0].team.team_name} {...a11yProps(0)} />
              <Tab label={stats[1].team.team_name} {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <StatsPanel value={value} index={0} stats={stats[0]} />
          <StatsPanel value={value} index={1} stats={stats[1]} />
        </>
      )}

      {stats.length === 0 && <h1>Loading</h1>}
    </div>
  );
};

export default StatsView;
