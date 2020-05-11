import React, { useState } from 'react';
import IceSurface from './IceSurface';

const StrategyBoard = ({ shot, nextShot, prevShot }) => {
  const [pathHistory, setPathHistory] = useState([[]]);

  // const resetShot = () => {
  //   setPathHistory((prev) => {
  //     const updatedHistory = [...prev];

  //     if (prev[shot]) {
  //       updatedHistory[shot] = [];
  //     } else {
  //       updatedHistory[shot] = [];
  //     }

  //     return updatedHistory;
  //   });
  // };

  return (
    <div className="strategy-board">
      <IceSurface
        shot={shot}
        pathHistory={pathHistory}
        setPathHistory={setPathHistory}
      ></IceSurface>
      <h1>Shot number: {shot}</h1>
      {/* {shot > 1 && <button onClick={prevShot}>Prev</button>}
      {pathHistory[shot + 1] && <button onClick={nextShot}>Next</button>} */}

      <button onClick={prevShot}>Prev</button>
      <button onClick={nextShot}>Next</button>

      {/* {pathHistory[shot] && <button onClick={resetShot}>Reset Shot</button>}
      <button onClick={resetShot}>Reset Shot</button> */}
    </div>
  );
};

export default StrategyBoard;
