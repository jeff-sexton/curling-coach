import { useReducer, useEffect } from 'react';
import axios from 'axios';

const SET_INITIAL_GAME_STATE = 'SET_INITIAL_GAME_STATE';
const SET_THROW_ORDER = 'SET_THROW_ORDER';
const SET_FIRST_TEAM = 'SET_FIRST_TEAM';
const SET_CURRENT_SHOT = 'SET_CURRENT_SHOT';
const SET_SHOT_DETAILS = 'SET_SHOT_DETAILS';
const SET_END_DETAILS = 'SET_END_DETAILS';
const SET_CURRENT_END = 'SET_CURRENT_END';
const INITIALIZE_END = 'INITIALIZE_END';
const INITIALIZE_SHOT = 'INITIALIZE_SHOT';
const SET_PATH_HISTORY = 'SET_PATH_HISTORY';
const COMPLETE_LOAD = 'COMPLETE_LOAD';

const reducer = (state, action) => {
  // Reducers

  const SET_INITIAL_GAME_STATE = ({ value }) => ({
    ...state,
    ...value,
  });

  const COMPLETE_LOAD = () => ({ ...state, loaded: true });

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

  const SET_SHOT_DETAILS = ({ value }) => {
    const currentEnd = state.currentEnd;
    const currentShot = state.currentShot;

    const shot = { ...state.ends[currentEnd].shots[currentShot], ...value };

    const shots = [...state.ends[currentEnd].shots];
    shots[currentShot] = shot;

    const ends = [...state.ends];
    ends[currentEnd] = { ...ends[currentEnd], shots };

    return { ...state, ends };
  };

  const SET_END_DETAILS = ({ value }) => {
    const currentEnd = state.currentEnd;

    const end = { ...state.ends[currentEnd], end: value };

    const ends = [...state.ends];
    ends[currentEnd] = { ...ends[currentEnd], ...end };

    return { ...state, ends };
  };
  const INITIALIZE_SHOT = ({ value }) => {
    const targetEnd = value.end;
    const targetShot = value.shot;

    if (state.ends[targetEnd].shots[targetShot]) {
      return { ...state };
    } else {
      const end_id = state.ends[targetEnd].end.id;
      const shot_number = targetShot + 1;

      const shot = {
        end_id,
        shot_number,
        rotation: '',
        rating: '',
        shot_type: '',
        rock_paths: [],
        player_id: null,
      };

      const shots = [...state.ends[targetEnd].shots];
      shots[targetShot] = shot;

      const ends = [...state.ends];
      ends[targetEnd] = { ...ends[targetEnd], shots };

      return { ...state, ends };
    }
  };
  const INITIALIZE_END = () => {
    const currentEnd = state.currentEnd;
    console.log('test case', state.ends[currentEnd]);

    if (
      state.ends[currentEnd] &&
      state.ends[currentEnd].end &&
      state.ends[currentEnd].end.id
    ) {
      return { ...state };
      // existing end and end id already loaded
    } else {
      const game_id = state.game.id;

      const end = {
        end: {
          game_id,
          score_team1: null,
          score_team2: null,
          first_team_id: null,
          throw_order: null,
        },
        shots: [],
      };

      const ends = [...state.ends];
      ends[currentEnd] = end;

      return { ...state, ends };
    }
  };

  const SET_PATH_HISTORY = ({ value }) => {
    // const updatedHistory = [...prev];

    // console.log('prevHistory[shot]', prev[shot]);

    // if (prev[shot]) {
    //   const lastPositionIndex = prev[shot].length - 1;
    //   console.log(lastPositionIndex);
    //   const prevPosition = prev[shot][lastPositionIndex];
    //   console.log('prevPosition', prevPosition);
    //   console.log('newPosition', { x, y });

    //   if (
    //     Math.abs(x - prevPosition.x) > 10 ||
    //     Math.abs(y - prevPosition.y) > 10
    //   ) {
    //     updatedHistory[shot] = [...prev[shot], { id, x, y }];
    //   }
    // } else {
    //   updatedHistory[shot] = [{ id, x, y }];
    // }
    // return updatedHistory;

    const currentEnd = state.currentEnd;
    const currentShot = state.currentShot;
    const rock_paths = [
      ...state.ends[currentEnd].shots[currentShot].rock_paths,
    ];
    const prevPosition = rock_paths[rock_paths.length - 1];

    if (
      !prevPosition ||
      Math.abs(value.x - prevPosition.x) > 10 ||
      Math.abs(value.y - prevPosition.y) > 10
    ) {
      // Add new rock position value if it has moved enough

      rock_paths.push(value);

      const shot = { ...state.ends[currentEnd].shots[currentShot], rock_paths };

      const shots = [...state.ends[currentEnd].shots];
      shots[currentShot] = shot;

      const ends = [...state.ends];
      ends[currentEnd] = { ...ends[currentEnd], shots };

      return { ...state, ends };
    } else {
      //Don't update state
      return { ...state };
    }
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
    SET_END_DETAILS,
    INITIALIZE_END,
    INITIALIZE_SHOT,
    SET_PATH_HISTORY,
    COMPLETE_LOAD,
    DEFAULT,
  };

  return (actions[action.type] || actions.DEFAULT)(action);
};

const useApplicationData = (game_id) => {
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
      .get(`/api/games/${game_id}`)
      .then((res) => {
        dispatch({ type: SET_INITIAL_GAME_STATE, value: res.data });
      })
      .then(() => {
        dispatch({ type: INITIALIZE_END, value: null });
        // initializeEnd()
      })
      .then(() => {
        dispatch({
          type: INITIALIZE_SHOT,
          value: { shot: gameState.currentShot, end: gameState.currentEnd },
        });
      })
      .then(() => {
        dispatch({ type: COMPLETE_LOAD, value: null });
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
      const nextEnd = gameState.currentEnd + 1;
      dispatch({ type: INITIALIZE_SHOT, value: { shot: 0, end: nextEnd } });

      if (gameState.currentEnd < 12) {
        dispatch({ type: SET_CURRENT_END, value: nextEnd });
      }
      dispatch({ type: SET_CURRENT_SHOT, value: 0 });
    } else {
      dispatch({
        type: INITIALIZE_SHOT,
        value: { shot: newCurrentShot, end: gameState.currentEnd },
      });

      dispatch({ type: SET_CURRENT_SHOT, value: newCurrentShot });
    }
  };

  const prevShot = () => {
    const newCurrentShot = gameState.currentShot - 1;
    if (newCurrentShot >= 0) {
      dispatch({ type: SET_CURRENT_SHOT, value: newCurrentShot });
    }
  };

  const saveShot = () => {
    const currentEnd = gameState.currentEnd;
    const currentShot = gameState.currentShot;

    const shot = { ...gameState.ends[currentEnd].shots[currentShot] };

    shot.rock_paths = JSON.stringify(shot.rock_paths);

    shot.player_id = gameState.ends[currentEnd].end.throw_order[currentShot].id;

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

  const startEnd = (team_id) => {
    dispatch({ type: SET_FIRST_TEAM, value: team_id });
    dispatch({ type: SET_THROW_ORDER, value: null });

    // axios.post('/api/ends', end)
    // .then(res => {
    //   dispatch({ type: SET_END_DETAILS, value: res.data });
  };

  const storeRockHistory = (positionValue) => {
    dispatch({ type: SET_PATH_HISTORY, value: positionValue });
  };

  const storeShotDetails = (detail) => {
    dispatch({ type: SET_SHOT_DETAILS, value: detail });
  };

  return {
    gameState,
    nextShot,
    prevShot,
    saveShot,
    startEnd,
    storeRockHistory,
    storeShotDetails,
  };
};

export default useApplicationData;
