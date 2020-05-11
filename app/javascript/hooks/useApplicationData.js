import { useReducer } from 'react';
import axios from 'axios';

const SET_GAME_STATE = 'SET_GAME_STATE';

const reducer = (state, action) => {
  // Reducers
  const SET_GAME_STATE = ({ value }) => {
    return { ...state, ...value };
  };

  const DEFAULT = () => {
    throw new Error(
      `Tried to reduce with unsupported action type: ${action.type}`
    );
  };

  // Reducer action lookup
  const actions = {
    SET_GAME_STATE,
    DEFAULT,
  };

  return (actions[action.type] || actions.DEFAULT)(action);
};

const useApplicationData = () => {
  const [gameState, dispatch] = useReducer(reducer, {
    game: {},
    ends: [],
    teams_with_players: [],
    currentShot: 1,
    currentEnd: 1,
    endThrowOrder: [],
  });

  const getGameDetails = () => {
    axios
      .get(`/api/games/${1}`)
      .then((res) => {
        dispatch({ type: SET_GAME_STATE, value: res.data });
      })
      .catch((err) => {
        console.log('err = ', err);
      });
  };

  const setThrowOrder = () => {
    const throwOrder = [];
    
    let i = 0;
    for (const team of gameState.teams_with_players) {
      let p = 0;
      for (const player of team.players) {
        throwOrder[i + p] = player;
        throwOrder[i + p + 2] = player;
        p += 4;
      }
      i++;
    }
    dispatch({ type: SET_GAME_STATE, value: { endThrowOrder: throwOrder } });
  };

  const nextShot = () => {
    dispatch({
      type: SET_GAME_STATE,
      value: { currentShot: gameState.currentShot + 1 },
    });
  };
  const prevShot = () => {
    dispatch({
      type: SET_GAME_STATE,
      value: { currentShot: gameState.currentShot - 1 },
    });
    // setShot((prev) => {
    //   if (prev > 1) {
    //     return prev - 1;
    //   }
    //   return prev;
    // });
  };

  const saveShot = () => {
    nextShot();
    // Save forms & shot path history to server here
    console.log('throwOrder', setThrowOrder());
  };

  return { gameState, getGameDetails, nextShot, prevShot, saveShot };
};

export default useApplicationData;
