import React, { useRef, useEffect, useState } from 'react';
import Rock from './Rock';

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

const IceSurface = ({ gameState, setPathHistory, pathHistory }) => {
  const iceRef = useRef();

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

  return (
    <svg id="ice" ref={iceRef} height="100%" viewBox="0 0 750 1650">
      <rect x="0" y="0" width="100%" height="100%" fill="aliceblue" />
      <rect x="0" y="150" width="100%" height="17" fill="red" />
      <rect x="0" y="1485" width="100%" height="15" fill="blue" />
      <circle
        cx="375"
        cy="1200"
        r="300"
        fill="red"
        stroke="black"
        strokeWidth="5"
      />
      <circle
        cx="375"
        cy="1200"
        r="200"
        fill="aliceblue"
        stroke="black"
        strokeWidth="5"
      />
      <circle
        cx="375"
        cy="1200"
        r="100"
        fill="blue"
        stroke="black"
        strokeWidth="5"
      />
      <circle
        cx="375"
        cy="1200"
        r="37.5"
        fill="aliceblue"
        stroke="black"
        strokeWidth="5"
      />
      <line x1="375" y1="0" x2="375" y2="1650" stroke="black" strokeWidth="5" />
      <line
        x1="0"
        y1="1200"
        x2="750"
        y2="1200"
        stroke="black"
        strokeWidth="5"
      />
      <Rock
        id={1}
        positionChange={positionChange}
        x={50}
        y={50}
        color="red"
        parentRef={iceRef}
        storeHistory={storeHistory}
        pathHistory={pathHistory}
        shot={shot}
      />
      <Rock
        id={2}
        positionChange={positionChange}
        x={100}
        y={50}
        color="red"
        parentRef={iceRef}
        storeHistory={storeHistory}
        pathHistory={pathHistory}
        shot={shot}
      />
      <Rock
        id={3}
        positionChange={positionChange}
        x={150}
        y={50}
        color="red"
        parentRef={iceRef}
        storeHistory={storeHistory}
        pathHistory={pathHistory}
        shot={shot}
      />
      <Rock
        id={4}
        positionChange={positionChange}
        x={200}
        y={50}
        color="red"
        parentRef={iceRef}
        storeHistory={storeHistory}
        pathHistory={pathHistory}
        shot={shot}
      />
      <Rock
        id={5}
        positionChange={positionChange}
        x={50}
        y={100}
        color="red"
        parentRef={iceRef}
        storeHistory={storeHistory}
        pathHistory={pathHistory}
        shot={shot}
      />
      <Rock
        id={6}
        positionChange={positionChange}
        x={100}
        y={100}
        color="red"
        parentRef={iceRef}
        storeHistory={storeHistory}
        pathHistory={pathHistory}
        shot={shot}
      />
      <Rock
        id={7}
        positionChange={positionChange}
        x={150}
        y={100}
        color="red"
        parentRef={iceRef}
        storeHistory={storeHistory}
        pathHistory={pathHistory}
        shot={shot}
      />
      <Rock
        id={8}
        positionChange={positionChange}
        x={200}
        y={100}
        color="red"
        parentRef={iceRef}
        storeHistory={storeHistory}
        pathHistory={pathHistory}
        shot={shot}
      />

      <Rock
        id={9}
        positionChange={positionChange}
        x={500}
        y={50}
        color="yellow"
        parentRef={iceRef}
        storeHistory={storeHistory}
        pathHistory={pathHistory}
        shot={shot}
      />
      <Rock
        id={10}
        positionChange={positionChange}
        x={550}
        y={50}
        color="yellow"
        parentRef={iceRef}
        storeHistory={storeHistory}
        pathHistory={pathHistory}
        shot={shot}
      />
      <Rock
        id={11}
        positionChange={positionChange}
        x={600}
        y={50}
        color="yellow"
        parentRef={iceRef}
        storeHistory={storeHistory}
        pathHistory={pathHistory}
        shot={shot}
      />
      <Rock
        id={12}
        positionChange={positionChange}
        x={650}
        y={50}
        color="yellow"
        parentRef={iceRef}
        storeHistory={storeHistory}
        pathHistory={pathHistory}
        shot={shot}
      />
      <Rock
        id={13}
        positionChange={positionChange}
        x={500}
        y={100}
        color="yellow"
        parentRef={iceRef}
        storeHistory={storeHistory}
        pathHistory={pathHistory}
        shot={shot}
      />
      <Rock
        id={14}
        positionChange={positionChange}
        x={550}
        y={100}
        color="yellow"
        parentRef={iceRef}
        storeHistory={storeHistory}
        pathHistory={pathHistory}
        shot={shot}
      />
      <Rock
        id={15}
        positionChange={positionChange}
        x={600}
        y={100}
        color="yellow"
        parentRef={iceRef}
        storeHistory={storeHistory}
        pathHistory={pathHistory}
        shot={shot}
      />
      <Rock
        id={16}
        positionChange={positionChange}
        x={650}
        y={100}
        color="yellow"
        parentRef={iceRef}
        storeHistory={storeHistory}
        pathHistory={pathHistory}
        shot={shot}
      />
    </svg>
  );
};

export default IceSurface;
