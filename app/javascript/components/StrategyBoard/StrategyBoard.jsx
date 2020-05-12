import React, { useState, useRef, useEffect } from 'react';
import IceSurface from './IceSurface';



const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

const StrategyBoard = ({
  nextShot,
  prevShot,
  gameState,
  pathHistory,
  setPathHistory,
}) => {
  
  // TODO - Move position change to higher component so it can be triggered by reset function as well
  const shot = gameState.currentShot;
  const previousShot = usePrevious(shot);
  const [positionChange, setPositionChange] = useState({});

  // TODO - move replay position function to higher component so it can be triggered by reset function as well
  useEffect(() => {
    const stepBack = (previousShot) => {
      const lastIndex = pathHistory[previousShot].length - 1;
      let rockStep = lastIndex;
      console.log('last rockstep', rockStep);

      return () => {
        rockStep -= 1;

        if (rockStep < 0) {
          return null;
        } else {
          return pathHistory[previousShot][rockStep];
        }
      };
    };

    const stepForward = (shot) => {
      const lastIndex = pathHistory[shot].length - 1;
      let rockStep = 0;

      return () => {
        rockStep += 1;

        if (rockStep > lastIndex) {
          return null;
        } else {
          return pathHistory[shot][rockStep];
        }
      };
    };

    if (previousShot && shot !== previousShot) {
      console.log('replay?');
      console.log('previousShot', previousShot);

      if (shot < previousShot && pathHistory[previousShot]) {
        const getPathStep = stepBack(previousShot);
        const replayInterval = setInterval(() => {
          const stepPosition = getPathStep();
          if (stepPosition) {
            setPositionChange(stepPosition);
          } else {
            clearInterval(replayInterval);
          }

          console.log('interval');
        }, 20);
      } else if (shot > previousShot && pathHistory[shot]) {
        const getPathStep = stepForward(shot);
        const replayInterval = setInterval(() => {
          const stepPosition = getPathStep();
          if (stepPosition) {
            setPositionChange(stepPosition);
          } else {
            clearInterval(replayInterval);
          }

          console.log('interval');
        }, 20);
      }
    }
  }, [pathHistory, shot, previousShot]);

  // TODO - generate rocks based on throwing order state and associate
  // initial positions off screen?

  const storeHistory = ({ id, x, y }) => {
    console.log('update');
    setPathHistory((prev) => {
      const updatedHistory = [...prev];

      console.log('prevHistory[shot]', prev[shot]);

      if (prev[shot]) {
        const lastPositionIndex = prev[shot].length - 1;
        console.log(lastPositionIndex);
        const prevPosition = prev[shot][lastPositionIndex];
        console.log('prevPosition', prevPosition);
        console.log('newPosition', { x, y });

        if (
          Math.abs(x - prevPosition.x) > 10 ||
          Math.abs(y - prevPosition.y) > 10
        ) {
          updatedHistory[shot] = [...prev[shot], { id, x, y }];
        }
      } else {
        updatedHistory[shot] = [{ id, x, y }];
      }

      return updatedHistory;
    });
  };

  const resetShot = () => {
    setPathHistory((prev) => {
      const updatedHistory = [...prev];

      updatedHistory[gameState.currentShot] = prev[gameState.currentShot].slice(
        0,
        16
      );

      return updatedHistory;
    });
  };

  return (
    <div className="strategy-board">
      <IceSurface
        gameState={gameState}
        pathHistory={pathHistory}
        setPathHistory={setPathHistory}
        positionChange={positionChange}
        storeHistory={storeHistory}
        shot={shot}
      ></IceSurface>
      <h1>Shot number: {gameState.currentShot}</h1>
      {gameState.currentShot > 0 && <button onClick={prevShot}>Prev</button>}

      {pathHistory[gameState.currentShot + 1] && (
        <button onClick={nextShot}>Next</button>
      )}

      {pathHistory[gameState.currentShot] &&
        pathHistory[gameState.currentShot].length > 16 && (
          <button onClick={resetShot}>Reset Shot</button>
        )}
    </div>
  );
};

export default StrategyBoard;
