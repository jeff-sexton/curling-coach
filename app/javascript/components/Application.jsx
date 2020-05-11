import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import GameView from './views/GameView'
import TestView from './views/TestView'
import DashboardView from './views/DashboardView'
import NavBar from './NavBar'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '1000px',
    margin: 'auto',
  },
}));

const DASHBOARD = 'DASHBOARD'
const GAME = 'GAME'

const App = () => {
  const classes = useStyles();

  const [view, setView] = useState(GAME)
  

  return (
    <div className={classes.root}>

      <NavBar setView={setView}/>
      {view === DASHBOARD && <DashboardView setView={setView}/>}
      {view === GAME && <GameView />}
      {/* <TestView /> */}

    </div>
  );
};

export default App;
