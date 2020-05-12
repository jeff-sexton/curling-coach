import React, { useState, useEffect } from 'react';

const Rock = ({
  id,
  positionChange,
  x,
  y,
  color,
  parentRef,
  storeHistory,
  pathHistory,
  shot,
}) => {
  const [position, setPosition] = useState({ x, y });
  const [selected, setSelected] = useState(false);

  // Add current position to pathHistory for every new show
  useEffect(() => {
    // console.log(pathHistory[shot] === undefined || pathHistory[shot].length === 0);

    if (pathHistory[shot] === undefined || pathHistory[shot].length === 0) {
      console.log('store initial position');
      storeHistory({ id, x: position.x, y: position.y });
    }
  }, [shot]);

  // Respond to replay position changes
  useEffect(() => {
    const { id: changeId, x: changeX, y: changeY } = positionChange;
    if (changeId === id) {
      setPosition({ x: changeX, y: changeY });
    }
  }, [positionChange]);

  // Add new rock paths to pathHistory on user drag
  useEffect(() => {
    const trackMouse = (event) => {
      const parentLocation = parentRef.current.getBoundingClientRect();
      //   // console.log('parent-location', parentLocation)
      //   // console.log('parent ref', parentRef)

      //   // DOMRect {x: 644.65625, y: 0, width: 500, height: 500, top: 0, …}
      //   // bottom: 500
      //   // height: 500
      //   // left: 644.65625
      //   // right: 1144.65625
      //   // top: 0
      //   // width: 500
      //   // x: 644.65625
      //   // y: 0

      //   // limits?

      const svgWidth = parentLocation.width;
      const viewWidth = 750;
      const relativeX = event.clientX - parentLocation.x;

      const x = (relativeX / svgWidth) * viewWidth;

      const svgHeight = parentLocation.height;
      const viewHeight = 1650;
      const relativeY = event.clientY - parentLocation.y;

      const y = (relativeY / svgHeight) * viewHeight;

      setPosition({ x, y });
      storeHistory({ id, x, y });

      // Stop rock selection if mouse leaves ice surface
      if (
        event.clientX > parentLocation.right - 5 ||
        event.clientX < parentLocation.left + 5 ||
        event.clientY > parentLocation.bottom - 5 ||
        event.clientY < parentLocation.top + 5
      ) {
        setSelected(false);
      }
    };

    if (selected) {
      document.addEventListener('mousemove', trackMouse);
    }

    return () => {
      document.removeEventListener('mousemove', trackMouse);
    };
  }, [selected, parentRef]);

  const move = (event) => {
    setSelected(true);

    console.log('move');
  };

  const endMove = () => {
    setSelected(false);
    console.log('stop');
  };

  return (
    <g onMouseDown={move} onMouseUp={endMove}>
      <circle
        cx={position.x}
        cy={position.y}
        r={25}
        fill="grey"
        stroke="lightgrey"
        strokeWidth="2"
      />
      <circle cx={position.x} cy={position.y} r={15} fill={color} />
      {/* <rect x={position.x} y={position.y} width='5' height='10' rx='1' fill='black' stroke="black"
        strokeWidth="1"/> */}
    </g>
  );
};

export default Rock;
