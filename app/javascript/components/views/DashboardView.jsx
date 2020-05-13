import React from 'react';
import Dashboard from '../Dashboard';

const DashboardView = ({ setView }) => {
  return (
    <div>
      <Dashboard onClick={() => setView('GAME')} />
      <button onClick={() => setView('GAME')}>Go to game</button>
    </div>
  );
};

export default DashboardView;
