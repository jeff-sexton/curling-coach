import React, { useState, useEffect } from 'react';

import axios from 'axios';

const StatsView = ({ gameId }) => {
  const [stats, setStats] = useState();

  useEffect(() => {
    if (gameId) {
      axios
        .get(`api/shots/${gameId}`)
        .then((res) => {
          console.log(res.data);
          setStats(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [gameId]);

  return (
    <div>
      <h1>Stats for Game: {gameId}</h1>
      <div>{stats}</div>
    </div>
  );
};

export default StatsView;
