import React, {useState} from 'react';

import GameView from './views/GameView'
import TestView from './views/TestView'
import DashboardView from './views/DashboardView'
import NavBar from './components/NavBar'
import { makeStyles } from '@material-ui/core/styles';

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

  const [view, setView] = useState(DASHBOARD)
  

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
