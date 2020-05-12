import React from 'react';
import Box from '@material-ui/core/Box'
import ProgressBar from './ProgressBar';



const EndDetails = () => {
  return (
    <div>
     <Box  bgcolor="info.main" textAlign="center">End Info</Box> 
     
      <ProgressBar end={10} currentShot={15} />
    </div>
  );
}


export default EndDetails;