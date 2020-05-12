import React from 'react';
import EndTab from './EndTab';
import ProgressBar from './ProgressBar';



const EndDetails = () => {
  return (
    <div>
     <h3>End Info</h3>
      <EndTab />
      <ProgressBar end={7} />
    </div>
  );
}


export default EndDetails;