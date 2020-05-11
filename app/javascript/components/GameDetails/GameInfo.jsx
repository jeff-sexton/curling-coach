import React from 'react';
import Box from '@material-ui/core/Box';
import DateTime from './DateTime';
import Location from './Location';
import TeamNames from './TeamNames';

const GameInfo = () => {
  return (
    <div>
      <Box pl={3} pr={3}>
        <DateTime />
        <Location />
      </Box>
      <TeamNames />
    </div>
  );
};

export default GameInfo;
