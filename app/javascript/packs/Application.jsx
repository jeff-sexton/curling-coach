import React, { useState } from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import NavBar from '../components/NavBar';
import DashboardView from '../views/DashboardView';
import GameView from '../views/GameView';
import StatsView from '../views/StatsView';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#42a5f5',
    },
    secondary: {
      main: '#4dd0e1',
    },
    text: {
      primary: '#2e2e2e',
    },
    // team1Color is used only for scorebaord for now
    team1Color: {
      main: '#f4511e',
    },
    // team2Color is used only for scorebaord for now
    team2Color: {
      main: '#fdd835',
    },
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
  },
  // overwrites button components
  overrides: {
    MuiButton: {
      label: {
        color: 'white',
      },
      // changes color of button
      // contained: {
      //   backgroundColor: "#6586c0",
      // }
    },
    MuiTableCell: {
      head: {
        background: "#1a5d99",
        border: '1px solid #d0d0d0',
        color: '#ffffff',
      }
    },
  },
  
});

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '1000px',
    margin: 'auto',
  },
}));

const DASHBOARD = 'DASHBOARD';
const GAME = 'GAME';
const STATS = 'STATS';

const App = () => {
  const classes = useStyles();

  const [view, setView] = useState(DASHBOARD);
  const [selectedGameId, setSelectedGameId] = useState();

  const handleGameSelection = (gameId) => {
    setSelectedGameId(gameId);
    setView(GAME);
  };
  const handleStatsSelection = (gameId) => {
    setSelectedGameId(gameId);
    setView(STATS);
  };

  const handleHome = () => {
    setView(DASHBOARD);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <NavBar handleHome={handleHome} color="primary" />
        {view === DASHBOARD && (
          <DashboardView
            handleGameSelection={handleGameSelection}
            handleStatsSelection={handleStatsSelection}
            color="primary"
          />
        )}
        {view === GAME && <GameView gameId={selectedGameId} color="primary" />}
        {view === STATS && <StatsView gameId={selectedGameId}/>}
      </div>
    </ThemeProvider>
  );
};

export default App;
