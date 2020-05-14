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
  storeRockHistory,
}) => {
  
  const { currentShot, currentEnd } = gameState;
  const previousShot = usePrevious(currentShot);
  const [positionChange, setPositionChange] = useState({});

  const pathHistory = gameState.ends[currentEnd].shots;
  // TODO - move replay position function to higher component so it can be triggered by reset function as well
  // useEffect(() => {
    // const stepBack = (previousShot, history) => {
    //   const lastIndex = history[previousShot].length - 1;
    //   let rockStep = lastIndex;
    //   console.log('last rockstep', rockStep);

    //   return () => {
    //     rockStep -= 1;

    //     if (rockStep < 0) {
    //       return null;
    //     } else {
    //       return history[previousShot][rockStep];
    //     }
    //   };
    // };

    // const stepForward = (shot, history) => {
    //   const lastIndex = history[shot].length - 1;
    //   let rockStep = 0;

    //   return () => {
    //     rockStep += 1;

    //     if (rockStep > lastIndex) {
    //       return null;
    //     } else {
    //       return history[currentShot][rockStep];
    //     }
    //   };
    // };

  //   if (previousShot && currentShot !== previousShot) {
  //     console.log('replay?');
  //     console.log('previousShot', previousShot);

  //     const previousHistory = gameState.ends[currentEnd].shots[previousShot].rock_paths;
  //     const currentHistory = gameState.ends[currentEnd].shots[currentShot].rock_paths;

  //     if (currentShot < previousShot && previousHistory) {
  //       const getPathStep = stepBack(previousShot, previousHistory);
  //       const replayInterval = setInterval(() => {
  //         const stepPosition = getPathStep();
  //         if (stepPosition) {
  //           setPositionChange(stepPosition);
  //         } else {
  //           clearInterval(replayInterval);
  //         }

  //         console.log('interval');
  //       }, 20);
  //     } else if (currentShot > previousShot && currentHistory) {
  //       const getPathStep = stepForward(currentShot, currentHistory);
  //       const replayInterval = setInterval(() => {
  //         const stepPosition = getPathStep();
  //         if (stepPosition) {
  //           setPositionChange(stepPosition);
  //         } else {
  //           clearInterval(replayInterval);
  //         }

  //         console.log('interval');
  //       }, 20);
  //     }
  //   }
  // }, [pathHistory, currentShot, previousShot]);

  // TODO - generate rocks based on throwing order state and associate
  // initial positions off screen?

  const stepBack = ( history) => {
    const lastIndex = history.length - 1;
    let rockStep = lastIndex;
    console.log('last rockstep', rockStep);

    return () => {
      rockStep -= 1;

      if (rockStep < 0) {
        return null;
      } else {
        return history[rockStep];
      }
    };
  };

  const stepForward = (history) => {
    const lastIndex = history.length - 1;
    let rockStep = 0;

    return () => {
      rockStep += 1;

      if (rockStep > lastIndex) {
        return null;
      } else {
        return history[rockStep];
      }
    };
  };



  const onPrev = () => {
    const currentHistory = gameState.ends[currentEnd].shots[currentShot].rock_paths;

    if ( currentHistory && currentHistory.length > 15) {
      const getPathStep = stepBack(currentHistory);

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

    prevShot()

  }

  const onNext = () => {
    nextShot()

  }


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
        pathHistory={pathHistory}
        positionChange={positionChange}
        storeHistory={storeRockHistory}
        shot={currentShot}
        gameState={gameState}
      ></IceSurface>
      <h1>Shot number: {currentShot}</h1>
      {/* {currentShot > 0 && <button onClick={onPrev}>Prev</button>} */}

      <button onClick={onPrev}>Prev</button>

      {/* {pathHistory[gameState.currentShot + 1] && (
        <button onClick={nextShot}>Next</button>
        )} */}

        <button onClick={onNext}>Next</button>
      {/* {pathHistory[gameState.currentShot] &&
        pathHistory[gameState.currentShot].length > 16 && (
          <button onClick={resetShot}>Reset Shot</button>
        )} */}
    </div>
  );
};

export default StrategyBoard;
