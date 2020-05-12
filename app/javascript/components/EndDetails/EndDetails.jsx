import React from 'react';
import Box from '@material-ui/core/Box'
import ProgressBar from './ProgressBar';



const EndDetails = () => {
  return (
    <div>
     <h3>End Info</h3>
     
      <ProgressBar end={5} currentShot={15} />
    </div>
  );
}


export default EndDetails;