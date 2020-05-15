import React, { useRef } from 'react';
import Rock from './Rock';

const IceSurface = ({
  positionChange,
  storeHistory,
  gameState,
  isEditable,
}) => {
  const iceRef = useRef();

  const initialPositions = [
    {
      label: 1,
      x: 50,
      y: 50,
      color: 'red',
    },
    {
      label: 2,
      x: 100,
      y: 50,
      color: 'red',
    },
    {
      label: 3,
      x: 150,
      y: 50,
      color: 'red',
    },
    {
      label: 4,
      x: 200,
      y: 50,
      color: 'red',
    },
    {
      label: 5,
      x: 50,
      y: 100,
      color: 'red',
    },
    {
      label: 6,
      x: 100,
      y: 100,
      color: 'red',
    },
    {
      label: 7,
      x: 150,
      y: 100,
      color: 'red',
    },
    {
      label: 8,
      x: 200,
      y: 100,
      color: 'red',
    },
    {
      label: 9,
      x: 550,
      y: 50,
      color: 'yellow',
    },
    {
      label: 10,
      x: 600,
      y: 50,
      color: 'yellow',
    },
    {
      label: 11,
      x: 650,
      y: 50,
      color: 'yellow',
    },
    {
      label: 12,
      x: 700,
      y: 50,
      color: 'yellow',
    },
    {
      label: 13,
      x: 550,
      y: 100,
      color: 'yellow',
    },
    {
      label: 14,
      x: 600,
      y: 100,
      color: 'yellow',
    },
    {
      label: 15,
      x: 650,
      y: 100,
      color: 'yellow',
    },
    {
      label: 16,
      x: 700,
      y: 100,
      color: 'yellow',
    },
  ];

  const rocks = initialPositions.map((initialPositon, index) => {
    const { x, y, color, label } = initialPositon;

    return (
      <Rock
        key={index}
        id={label}
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

      {rocks}
    </svg>
  );
};

export default IceSurface;
