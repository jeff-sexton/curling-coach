import React, { useRef } from 'react';
import Rock from './Rock';

const IceSurface = ({
  positionChange,
  storeHistory,
  gameState,
  isEditable,
  initialPositions,
}) => {
  const iceRef = useRef();



  const rocks = initialPositions.map((initialPositon, index) => {
    const { x, y, id } = initialPositon;
    let color = '';
    if (index < 8 ) {
      color = 'red';
    } else {
      color = 'yellow';
    }

    return (
      <Rock
        key={index}
        id={id}
        positionChange={positionChange}
        x={x}
        y={y}
        color={color}
        parentRef={iceRef}
        storeHistory={storeHistory}
        gameState={gameState}
        isEditable={isEditable}
      />
    );
  });

  return (
    <svg
      id="ice"
      ref={iceRef}
      height="100%"
      viewBox="0 0 750 1650"
      style={{ display: 'block' }}
    >
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

      {rocks}
    </svg>
  );
};

export default IceSurface;
