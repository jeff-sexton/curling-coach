import React, { useState, useEffect } from 'react';
import Dashboard from '../Dashboard';
import axios from 'axios';

const DashboardView = ({ setView }) => {
  const [gameList, setGameList] = useState({
    game: [],
  });

  useEffect(() => {
    axios.get(`/api/games`).then((res) => {
      setGameList({ game: res.data });
    });
  }, []);

  return (
    <div>
      <Dashboard onClick={() => setView('GAME')} gameList={gameList.game} />
      <button onClick={() => setView('GAME')}>Go to game</button>
    </div>
  );
};

export default DashboardView;
