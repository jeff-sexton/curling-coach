import { useReducer, useEffect } from 'react';
import axios from 'axios';

const SET_INITIAL_GAME_STATE = 'SET_INITIAL_GAME_STATE';
const SET_THROW_ORDER = 'SET_THROW_ORDER';
const SET_FIRST_TEAM = 'SET_FIRST_TEAM';
const SET_CURRENT_SHOT = 'SET_CURRENT_SHOT';
const SET_SHOT_DETAILS = 'SET_SHOT_DETAILS';
const SET_CURRENT_END = 'SET_CURRENT_END';

const reducer = (state, action) => {
  // Reducers
  const SET_INITIAL_GAME_STATE = ({ value }) => ({
    ...state,
    ...value,
    loaded: true,
  });

  const SET_THROW_ORDER = ({ value: throw_order }) => {
    if (!throw_order) {
      // Calculate throw order based on firstTeam state
      const throw_order = [];

      for (const teamObj of state.teams_with_players) {
        let teamOffset;
        if (
          teamObj.team.id === state.ends[state.currentEnd].end.first_team_id
        ) {
          teamOffset = 0;
        } else {
          teamOffset = 1;
        }
        for (const player of teamObj.players) {
          const playerOffset = (player.throw_order - 1) * 4;
          throw_order[teamOffset + playerOffset] = player;
          throw_order[teamOffset + playerOffset + 2] = player;
        }
      }

      const ends = [...state.ends];
      ends[state.currentEnd].end = {
        ...state.ends[state.currentEnd].end,
        throw_order,
      };

      return { ...state, ends };
    }
  };

  const SET_FIRST_TEAM = ({ value: first_team_id }) => {
    const ends = [...state.ends];
    ends[state.currentEnd].end = {
      ...state.ends[state.currentEnd].end,
      first_team_id,
    };

    return { ...state, ends };
  };

  const SET_CURRENT_END = ({ value: currentEnd }) => ({ ...state, currentEnd });

  const SET_CURRENT_SHOT = ({ value: currentShot }) => ({
    ...state,
    currentShot,
  });

  const SET_SHOT_DETAILS = ({ value: shot }) => {
    const currentEnd = state.currentEnd;
    const currentShot = state.currentShot;

    // const rock_paths = JSON.parse(shot.rock_paths);
    // console.log('rock_paths', rock_paths);
    // const formattedShot = {...shot, rock_paths: JSON.parse(shot.rock_paths)}

    const shots = [...state.ends[currentEnd].shots];
    shots[currentShot] = shot;

    const ends = [...state.ends];
    ends[currentEnd] = { ...ends[currentEnd], shots };

    return { ...state, ends };
  };

  const DEFAULT = () => {
    throw new Error(
      `Tried to reduce with unsupported action type: ${action.type}`
    );
  };

  // Reducer action lookup
  const actions = {
    SET_INITIAL_GAME_STATE,
    SET_THROW_ORDER,
    SET_FIRST_TEAM,
    SET_CURRENT_SHOT,
    SET_CURRENT_END,
    SET_SHOT_DETAILS,
    DEFAULT,
  };

  return (actions[action.type] || actions.DEFAULT)(action);
};

const useApplicationData = () => {
  const [gameState, dispatch] = useReducer(reducer, {
    game: {},
    ends: [],
    teams_with_players: [],
    currentShot: 0,
    currentEnd: 0,
    loaded: false,
  });

  // Get Initial Game details from API
  useEffect(() => {
    axios
      .get(`/api/games/${1}`)
      .then((res) => {
        dispatch({ type: SET_INITIAL_GAME_STATE, value: res.data });
      })
      .catch((err) => {
        console.log('err = ', err);
      });
  }, []);

  // TODO: Set Throw order from user input -- implement later
  const setThrowOrder = (throw_order) => {
    dispatch({ type: SET_THROW_ORDER, value: throw_order });
  };

  const nextShot = () => {
    const newCurrentShot = gameState.currentShot + 1;
    if (newCurrentShot > 15) {
      if (gameState.currentEnd < 12) {
        dispatch({ type: SET_CURRENT_END, value: gameState.currentEnd + 1 });
      }
      dispatch({ type: SET_CURRENT_SHOT, value: 0 });
    } else {
      dispatch({ type: SET_CURRENT_SHOT, value: newCurrentShot });
    }
  };

  // {
  //   let currentShot = state.currentShot + change;
  //   if (currentShot > 15) {
  //     CHANGE_END({value: state.currentEnd + 1})
  //     currentShot = 15;
  //   } else if (currentShot < 0) {
  //     currentShot = 0;
  //   }
  //   return { ...state, currentShot };
  // };

  const prevShot = () => {
    const newCurrentShot = gameState.currentShot - 1;
    if (newCurrentShot >= 0) {
      dispatch({ type: SET_CURRENT_SHOT, value: newCurrentShot });
    }
  };

  const saveShot = (shot) => {
    // Save forms & shot path history to server here
    axios
      .post('/api/shots', shot)
      .then((res) => {
        dispatch({ type: SET_SHOT_DETAILS, value: res.data });
        nextShot();
      })
      .catch((err) => {
        console.log(err);
      });

    // dispatch({ type: SET_SHOT_DETAILS, value: shot });
  };

  const initializeEnd = (team_id) => {
    dispatch({ type: SET_FIRST_TEAM, value: team_id });
    dispatch({ type: SET_THROW_ORDER, value: null });
  };

  return {
    gameState,
    nextShot,
    prevShot,
    saveShot,
    initializeEnd,
  };
};

export default useApplicationData;
