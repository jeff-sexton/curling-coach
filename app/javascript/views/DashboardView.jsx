import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Dashboard from '../components/Dashboard';
import Loading from '../components/Loading';

const DashboardView = ({ handleGameSelection, handleStatsSelection }) => {
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
          handleStatsSelection={handleStatsSelection}
          gameList={gameList}
        />
      )}

      {!dashboardLoaded && <Loading />}
    </div>
  );
};

export default DashboardView;
