import React, { useState } from 'react';
import IceSurface from './IceSurface';

const StrategyBoard = () => {
  const [shot, setShot] = useState(0);

  const nextShot = () => {
    setShot((prev) => prev + 1);
  };
  const prevShot = () => {
    setShot((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  };

  return (
    <div className="strategy-board">
      <IceSurface shot={shot}></IceSurface>
      <h1>Shot number: {shot}</h1>
      <button onClick={nextShot}>Next</button>
      <button onClick={prevShot}>Prev</button>
    </div>
  );
};

export default StrategyBoard;
