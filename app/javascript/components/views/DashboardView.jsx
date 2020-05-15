import React, { useState, useEffect } from 'react';
import Dashboard from '../Dashboard';
import axios from 'axios';

const DashboardView = ({ handleGameSelection }) => {
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    axios.get(`/api/games`).then((res) => {
      setGameList(res.data);
    });
  }, []);

  return (
    <div>
      <Dashboard handleGameSelection={handleGameSelection} gameList={gameList} />
      {/* <button onClick={() => setView('GAME')}>Go to game</button> */}
    </div>
  );
};

export default DashboardView;
