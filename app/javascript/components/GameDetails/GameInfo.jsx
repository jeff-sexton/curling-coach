import React from 'react';
import Box from '@material-ui/core/Box';

const GameInfo = () => {
  return (
    <div>
      <h3>Date: May 1, 2020 | Location: 7PM</h3>
      <Box
          display="flex"
          justifyContent="space-around">
        <div>Team 1</div>
        <div>vs</div>
        <div>Team 2</div>
      </Box>
    </div>
  )
}

export default GameInfo;