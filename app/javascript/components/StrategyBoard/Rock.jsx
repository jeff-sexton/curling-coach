import React, { useState, useEffect, useRef } from 'react';

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

const Rock = ({ x, y, color, parentRef, shot, replay, setReplay }) => {
  const [position, setPosition] = useState({ x, y });
  const [pathHistory, setPathHistory] = useState([]);
  const [selected, setSelected] = useState(false);

  const previousShot = usePrevious(shot);

  useEffect(() => {
    const storeHistory = ({ x, y }) => {
      console.log('update');
      setPathHistory((prev) => {
        const updatedHistory = [...prev];

        if (prev[shot]) {
          const lastPositionIndex = prev[shot].length - 1;
          console.log(lastPositionIndex);
          const prevPosition = prev[shot][lastPositionIndex];
          console.log('prev', prevPosition);
          console.log('new', { x, y });

          if (
            Math.abs(x - prevPosition.x) > 5 ||
            Math.abs(y - prevPosition.y) > 5
          ) {
            updatedHistory[shot] = [...prev[shot], { x, y }];
          }
        } else {
          updatedHistory[shot] = [{ x, y }];
        }

        return updatedHistory;
      });
    };

    const trackMouse = (event) => {
      const parentLocation = parentRef.current.getBoundingClientRect();
      // console.log('parent-location', parentLocation)
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

      // limits?

      // const x = Math.max(
      //   0,
      //   Math.min(parentLocation.width, event.clientX - parentLocation.x)
      // );

      const svgWidth = parentLocation.width;
      const viewWidth = 750;
      const relativeX = event.clientX - parentLocation.x


      const x = relativeX / svgWidth * viewWidth

      // const y = Math.max(
      //   0,
      //   Math.min(parentLocation.height, event.clientY - parentLocation.y)
      // );

      const svgHeight = parentLocation.height;
      const viewHeight = 1650;
      const relativeY = event.clientY - parentLocation.y

      const y = relativeY / svgHeight * viewHeight

      setPosition({ x, y });
      storeHistory({ x, y });

      // Stop rock selection if mouse leaves ice surface
      if (
        event.clientX > parentLocation.right ||
        event.clientX < parentLocation.left ||
        event.clientY > parentLocation.bottom ||
        event.clientY < parentLocation.top
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

  useEffect(() => {
    // Set inital position into history on shot state change
    if (!pathHistory[shot]) {
      setPathHistory((prev) => [...prev, (prev[shot] = [position])]);
    }
  }, [shot, setPathHistory, pathHistory, position]);

  useEffect(() => {
    const stepBack = (shot) => {
      let rockStep = pathHistory[shot].length - 1;
      console.log('last rockstep', rockStep);

      return () => {
        rockStep -= 1;
        return pathHistory[shot][rockStep];
      };
    };

    const stepForward = (shot) => {
      let rockStep = 0;

      return () => {
        rockStep += 1;
        return pathHistory[shot][rockStep];
      };
    };

    if (shot !== previousShot) {
      console.log('replay?');

      let getPathStep;
      if (shot < previousShot) {
        getPathStep = stepBack(previousShot);
      } else {
        getPathStep = stepForward(shot);
      }

      const replayInterval = setInterval(() => {
        const stepPosition = getPathStep();
        if (stepPosition) {
          console.log(stepPosition);
          setPosition(stepPosition);
        } else {
          clearInterval(replayInterval);
        }

        console.log('interval');
      }, 20);
    }
  }, [pathHistory, shot, previousShot]);

  const move = (event) => {
    setSelected(true);

    console.log('move');
  };

  const endMove = () => {
    setSelected(false);
    console.log('stop');
  };

  return (
    <g>
      <circle
        onMouseDown={move}
        cx={position.x}
        cy={position.y}
        r={30}
        fill="grey"
      />
      <circle
        onMouseDown={move}
        onMouseUp={endMove}
        onFo
        cx={position.x}
        cy={position.y}
        r={20}
        fill={color}
      />
    </g>
  );
};

export default Rock;
