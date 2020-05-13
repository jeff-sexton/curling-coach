import React, { useState } from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import GameView from './views/GameView';
import TestView from './views/TestView';
import DashboardView from './views/DashboardView';
import NavBar from './NavBar';

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

const App = () => {
  const classes = useStyles();

  const [view, setView] = useState(GAME);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <NavBar setView={setView} color="primary" />
        {view === DASHBOARD && (
          <DashboardView setView={setView} color="primary" />
        )}
        {view === GAME && <GameView color="primary" />}
        {/* <TestView /> */}
      </div>
    </ThemeProvider>
  );
};

export default App;
