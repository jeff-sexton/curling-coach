import React, { useState, useEffect } from 'react';
import Dashboard from '../Dashboard';
import axios from 'axios';

const DashboardView = ({ handleGameSelection }) => {
  const [gameList, setGameList] = useState([]);
  const [dashboardLoaded, setDashboardLoaded] = useState(false);

  useEffect(() => {
    axios.get(`/api/games`).then((res) => {
      setGameList(res.data);
      setDashboardLoaded(true);
    });
  }, []);

  return (
    <div>
      {dashboardLoaded && (
        <Dashboard
          handleGameSelection={handleGameSelection}
          gameList={gameList}
        />
      )}

      {!dashboardLoaded && (
        <div>
          <h1>LOADING</h1>
        </div>
      )}
    </div>
  );
};

export default DashboardView;
