import React from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import StatsTable from './StatsTable';

const StatsPanel = (props) => {
  const { value, index, stats } = props;

  const players = stats.players.map((player, index) => {
    return (
      <div key={index}>
        <StatsTable stats={player.player_stats} name={player.player.name} />
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
          <StatsTable stats={stats.team_stats} name={stats.team.team_name} />
          {players}
        </Box>
      )}
    </div>
  );
};

export default StatsPanel;
