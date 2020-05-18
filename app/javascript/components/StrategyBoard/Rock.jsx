import React, { useState, useEffect, useRef } from 'react';

const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

const Rock = ({
  id,
  positionChange,
  x,
  y,
  color,
  parentRef,
  storeHistory,
  gameState,
  isEditable,
}) => {
  const [position, setPosition] = useState({ x, y });
  const [storedPositionStep, setStoredPositionStep] = useState({ x, y });
  const [selected, setSelected] = useState(false);
  const [movedThisShot, setMovedThisShot] = useState(false);

  const { currentEnd, currentShot, loaded } = gameState;

  const lastStoredPosition = usePrevious(storedPositionStep);

  // Add current position to pathHistory for every new shot
  useEffect(() => {
    const pathHistory =
      gameState.ends[currentEnd].shots[currentShot].rock_paths;

    if (
      pathHistory === undefined ||
      (pathHistory.length === 0 && currentShot > 0)
    ) {
      storeHistory({ id, x: position.x, y: position.y });
    }
  }, [currentShot, loaded]);

  // Respond to replay position changes
  useEffect(() => {
    // console.log(positionChange)
    const { id: changeId, x: changeX, y: changeY } = positionChange;
    if (changeId === id) {
      setPosition({ x: changeX, y: changeY });
    }
  }, [positionChange]);

  // Reset moved indicator for every shot
  useEffect(() => {
    setMovedThisShot(false);

  }, [currentShot])

  // Add new rock paths to pathHistory on user drag
  useEffect(() => {
    const trackMouse = (event) => {
      const parentLocation = parentRef.current.getBoundingClientRect();
      // console.log('parent-location-width', parentLocation.width)
      // console.log('parent-location-height', parentLocation.height)
      // console.log('parent ref', parentRef)

      // DOMRect {x: 644.65625, y: 0, width: 500, height: 500, top: 0, …}
      // bottom: 500
      // height: 500
      // left: 644.65625
      // right: 1144.65625
      // top: 0
      // width: 500
      // x: 644.65625
      // y: 0

      const svgWidth = parentLocation.width;
      const viewWidth = 750;
      const relativeX = event.clientX - parentLocation.x;

      const x = (relativeX / svgWidth) * viewWidth;

      const svgHeight = parentLocation.height;
      const viewHeight = 1650;
      const relativeY = event.clientY - parentLocation.y;

      const y = (relativeY / svgHeight) * viewHeight;

      // Stop rock selection if mouse leaves ice surface
      if (
        event.clientX > parentLocation.right - 5 ||
        event.clientX < parentLocation.left + 5 ||
        event.clientY > parentLocation.bottom - 5 ||
        event.clientY < parentLocation.top + 5
      ) {
        setSelected(false);
      } else {
        // update all current positons for user
        setPosition({ x, y });

        // limit the amount of positions stored in gameState
        if (
          Math.abs(x - lastStoredPosition.x) > 50 ||
          Math.abs(y - lastStoredPosition.y) > 50
        ) {
          // Save stored position for future comparison
          setStoredPositionStep({ x, y });

          // Store path history in gameState
          storeHistory({ id, x, y });
        }
      }
    };

    const storeLastPosition = () => {
      storeHistory({ id, x: position.x, y: position.y });
      setStoredPositionStep({ x: position.x, y: position.y });
      setPosition({ x: position.x, y: position.y });
    };

    if (selected) {
      setMovedThisShot(true);
      document.addEventListener('mousemove', trackMouse);
    } else if ( movedThisShot === true &&
      ( storedPositionStep.x !== position.x ||
      storedPositionStep.y !== position.y )
    ) {
      // ensure any moved rocks record their finial positions in the history array
      setMovedThisShot(false);
      storeLastPosition();
    }

    return () => {
      document.removeEventListener('mousemove', trackMouse);
    };
  }, [selected, parentRef, position]);

  const move = (event) => {
    if (isEditable) {
      setSelected(true);
      console.log('move');
    } else {
      console.log('no move');
    }
  };

  const endMove = () => {
    setSelected(false);
    console.log('stop');
  };

  return (
    <svg
      onMouseDown={move}
      onMouseUp={endMove}
      x={position.x - 25}
      y={position.y - 25}
      height="50"
      width="50"
      viewBox="-25 -25 50 50"
    >
      <circle r={25} fill="grey" stroke="lightgrey" strokeWidth="2" />
      <circle r={15} fill={color} />
    </svg>
  );
};

export default Rock;
