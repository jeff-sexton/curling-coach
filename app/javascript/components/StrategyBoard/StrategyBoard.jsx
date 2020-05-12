import React, { useState } from 'react';
import IceSurface from './IceSurface';

const StrategyBoard = ({ nextShot, prevShot, gameState }) => {

  // TODO - move path history into GameState
  const [pathHistory, setPathHistory] = useState([]);

  const resetShot = () => {
    setPathHistory((prev) => {
      const updatedHistory = [...prev];

      updatedHistory[gameState.currentShot] = prev[gameState.currentShot].slice(0,16);

      return updatedHistory;
    });

  };

  return (
    <div className="strategy-board">
      <IceSurface
        gameState={gameState}
        pathHistory={pathHistory}
        setPathHistory={setPathHistory}
      ></IceSurface>
      <h1>Shot number: {gameState.currentShot}</h1>
      {gameState.currentShot > 0 && <button onClick={prevShot}>Prev</button>}
      
      {pathHistory[gameState.currentShot + 1] && <button onClick={nextShot}>Next</button>}

      {pathHistory[gameState.currentShot] && pathHistory[gameState.currentShot].length > 16 && <button onClick={resetShot}>Reset Shot</button>}
    </div>
  );
};

export default StrategyBoard;
