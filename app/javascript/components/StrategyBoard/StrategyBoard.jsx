import React, { useState, useEffect, useRef } from 'react';

import IceSurface from './IceSurface';
import BoardNav from './BoardNav';

const initialPositions = [
  {
    id: 1,
    x: 50,
    y: 50,
  },
  {
    id: 2,
    x: 100,
    y: 50,
  },
  {
    id: 3,
    x: 150,
    y: 50,
  },
  {
    id: 4,
    x: 200,
    y: 50,
  },
  {
    id: 5,
    x: 50,
    y: 100,
  },
  {
    id: 6,
    x: 100,
    y: 100,
  },
  {
    id: 7,
    x: 150,
    y: 100,
  },
  {
    id: 8,
    x: 200,
    y: 100,
  },
  {
    id: 9,
    x: 550,
    y: 50,
  },
  {
    id: 10,
    x: 600,
    y: 50,
  },
  {
    id: 11,
    x: 650,
    y: 50,
  },
  {
    id: 12,
    x: 700,
    y: 50,
  },
  {
    id: 13,
    x: 550,
    y: 100,
  },
  {
    id: 14,
    x: 600,
    y: 100,
  },
  {
    id: 15,
    x: 650,
    y: 100,
  },
  {
    id: 16,
    x: 700,
    y: 100,
  },
];

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
  setShot,
  gameState,
  storeRockHistory,
  isEditable,
}) => {
  const { currentShot, currentEnd } = gameState;
  const [positionChange, setPositionChange] = useState({});

  const previousShotNumber = usePrevious(currentShot);

  const FORWARD = 'FORWARD';
  const BACKWARD = 'BACKWARD';

  const replayRockPath = (direction, shot, end) => {
    const arrayStepper = () => {
      const lastIndex = gameState.ends[end].shots[shot].rock_paths.length - 1;

      if (direction === FORWARD) {
        let historyIndex = -1;
        return () => {
          historyIndex += 1;

          if (historyIndex > lastIndex) {
            return null;
          } else {
            return gameState.ends[end].shots[shot].rock_paths[historyIndex];
          }
        };
      } else if (direction === BACKWARD) {
        let historyIndex = lastIndex + 1;
        return () => {
          historyIndex -= 1;

          if (historyIndex < 0) {
            return null;
          } else {
            return gameState.ends[end].shots[shot].rock_paths[historyIndex];
          }
        };
      }
    };

    const getPathStep = arrayStepper();

    const replayInterval = setInterval(() => {
      const stepPosition = getPathStep();

      if (stepPosition) {
        setPositionChange(stepPosition);
      } else {
        clearInterval(replayInterval);
      }
    }, 30);
  };

  // Replay rock paths on initial load
  useEffect(() => {
    replayRockPath(FORWARD, currentShot, currentEnd);
  }, []);

  // Replay rock paths when shot is jumped to
  useEffect(() => {
    if (Math.abs(currentShot - previousShotNumber) > 2) {
      replayRockPath(FORWARD, currentShot, currentEnd);
    }
  }, [currentShot]);

  // Reset Rocks to inital positions for new ends
  useEffect(() => {
    if (
      currentShot === 0 &&
      gameState.ends[currentEnd].shots[currentShot].rock_paths.length === 0
    ) {
      // Store initial positions in history (rocks do not store their own positions for shot 0)
      for (const position of initialPositions) {
        storeRockHistory(position);
      }

      // Use set interval to move all rocks to initial positions
      const initialStepper = () => {
        const arrayEnd = initialPositions.length - 1;

        let stepIndex = -1;

        return () => {
          stepIndex += 1;

          if (stepIndex > arrayEnd) {
            return null;
          } else {
            return initialPositions[stepIndex];
          }
        };
      };

      const getPathStep = initialStepper();

      const replayInterval = setInterval(() => {
        const stepPosition = getPathStep();

        if (stepPosition) {
          setPositionChange(stepPosition);
        } else {
          clearInterval(replayInterval);
        }
      }, 30);
    }
  }, [currentEnd]);

  const onPrev = () => {
    replayRockPath(BACKWARD, currentShot, currentEnd);

    prevShot();
  };

  const onNext = () => {
    const nextShotState = gameState.ends[currentEnd].shots[currentShot + 1];

    if (nextShotState && nextShotState.rock_paths.length > 0) {
      replayRockPath(FORWARD, currentShot + 1, currentEnd);
    }

    nextShot();
  };

  const onLastShot = () => {
    const lastShotIndex = gameState.ends[currentEnd].shots.length - 1;

    setShot(lastShotIndex);
  };
  const onFirstShot = () => {
    setShot(0);
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
    <div className={'strategy-board'} style={{ width: 'fit-content' }}>
      <IceSurface
        positionChange={positionChange}
        storeHistory={storeRockHistory}
        gameState={gameState}
        isEditable={isEditable}
        initialPositions={initialPositions}
      />
      <BoardNav
        onNext={onNext}
        onPrev={onPrev}
        onLastShot={onLastShot}
        onFirstShot={onFirstShot}
        isEditable={isEditable}
        currentShot={currentShot}
      />
    </div>
  );
};

export default StrategyBoard;
