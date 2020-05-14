import React, { useState } from 'react';
import IceSurface from './IceSurface';

const StrategyBoard = ({ nextShot, prevShot, gameState, storeRockHistory }) => {
  const { currentShot, currentEnd } = gameState;
  const [positionChange, setPositionChange] = useState({});



  // TODO - generate rocks based on throwing order state and associate
  // initial positions off screen?


  const FORWARD = 'FORWARD';
  const BACKWARD = 'BACKWARD';

  const replayRockPath = (direction) => {
    const arrayStepper = (direction) => {
      const lastIndex =
        gameState.ends[currentEnd].shots[currentShot].rock_paths.length - 1;

      if (direction === FORWARD) {
        let historyIndex = 0;
        return () => {
          historyIndex += 1;

          if (historyIndex > lastIndex) {
            return null;
          } else {
            return gameState.ends[currentEnd].shots[currentShot].rock_paths[
              historyIndex
            ];
          }
        };
      } else if (direction === BACKWARD) {
        let historyIndex = lastIndex;
        return () => {
          historyIndex -= 1;

          if (historyIndex < 0) {
            return null;
          } else {
            return gameState.ends[currentEnd].shots[currentShot].rock_paths[
              historyIndex
            ];
          }
        };
      }
    };

    const getPathStep = arrayStepper(direction);

    const replayInterval = setInterval(() => {
      const stepPosition = getPathStep();

      if (stepPosition) {
        setPositionChange(stepPosition);
      } else {
        clearInterval(replayInterval);
      }
    }, 20);
  };

  const onPrev = () => {

    replayRockPath(BACKWARD);

    prevShot();
  };

  const onNext = () => {

    replayRockPath(FORWARD);
    nextShot();
  };

  const resetShot = () => {
    // const resetHistory = [...pathHistory[currentShot]]
    // while (resetHistory.length > 15) {
    //   setPositionChange(resetHistory.pop());
    // }
    // setPathHistory((prev) => {
    //   const updatedHistory = [...prev];
    //   updatedHistory[shot] = resetHistory;
    //   return updatedHistory;
    // });
  };

  return (
    <div className="strategy-board">
      <IceSurface
        positionChange={positionChange}
        storeHistory={storeRockHistory}
        gameState={gameState}
      ></IceSurface>
      <h3>
        Shot number: {currentShot + 1} array: {currentShot}
      </h3>
      {currentShot > 0 && <button onClick={onPrev}>Prev</button>}

      {/* <button onClick={onPrev}>Prev</button> */}



       {gameState.ends[currentEnd].shots[currentShot + 1] && 
        <button onClick={onNext}>Next</button>
        } 

      {/* <button onClick={onNext}>Next</button> */}
      {/* {pathHistory[gameState.currentShot] &&
        pathHistory[gameState.currentShot].length > 16 && (
          <button onClick={resetShot}>Reset Shot</button>
        )} */}
    </div>
  );
};

export default StrategyBoard;
