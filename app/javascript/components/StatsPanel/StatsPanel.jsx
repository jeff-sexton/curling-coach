import React from 'react';

import Box from '@material-ui/core/Box';

import StatsTable from './StatsTable';

const StatsPanel = ({ value, index, stats }) => {
  const players = stats.players.map((player, index) => {
    return (
      <div key={index}>
        {player.player_stats && (
          <StatsTable stats={player.player_stats} name={player.player.name} />
        )}
      </div>
    );
  });

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box p={3}>
          {stats.team_stats && (
            <StatsTable stats={stats.team_stats} name={stats.team.team_name} />
          )}
          {players}
        </Box>
      )}
    </div>
  );
};

export default StatsPanel;
