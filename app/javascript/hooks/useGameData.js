/* eslint-disable camelcase */
import { useReducer } from 'react';
import axios from 'axios';

const SET_INITIAL_GAME_STATE = 'SET_INITIAL_GAME_STATE';
const SET_THROW_ORDER = 'SET_THROW_ORDER'; // not currently used
const SET_FIRST_TEAM = 'SET_FIRST_TEAM'; // not currently used
const SET_CURRENT_SHOT_AND_END = 'SET_CURRENT_SHOT_AND_END';
const SET_SHOT_DETAILS = 'SET_SHOT_DETAILS';
const SET_SHOT_SAVE_ERRORS = 'SET_SHOT_SAVE_ERRORS';
const SET_END_DETAILS = 'SET_END_DETAILS';
const INITIALIZE_END = 'INITIALIZE_END';
const INITIALIZE_SHOT = 'INITIALIZE_SHOT';
const SET_PATH_HISTORY = 'SET_PATH_HISTORY';
const SET_LOADED = 'SET_LOADED';
const SET_COMPLETE_END_PROMPT = 'SET_COMPLETE_END_PROMPT';

const reducer = (state, action) => {
  // Reducers

  const SET_INITIAL_GAME_STATE = ({ value }) => ({
    ...state,
    ...value,
  });

  const SET_LOADED = ({ value }) => ({ ...state, loaded: value });

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
  
  const SET_CURRENT_SHOT_AND_END = ({ value: {currentShot, currentEnd }}) => ({ ...state, currentShot, currentEnd });

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

  const SET_SHOT_SAVE_ERRORS = ({ value }) => {
    return { ...state, shotSaveErrors: value };
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

    console.log('\n*** Initialize Shot ***\n', targetEnd, targetShot);

    if (state.ends[targetEnd].shots[targetShot]) {
      console.log('existing shot');
      return { ...state };
    } else {
      console.log('new shot');
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
  const INITIALIZE_END = ({ value }) => {
    const targetEnd = value.end;
    console.log('\n\n ***** inialize end *****\n\n');

    if (
      state.ends[targetEnd] &&
      state.ends[targetEnd].end &&
      state.ends[targetEnd].end.id
    ) {
      console.log('exisitng end', state.ends[targetEnd].end);
      return { ...state };
      // existing end and end id already loaded
    } else {
      console.log('initialize new end');
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
      ends[targetEnd] = end;

      return { ...state, ends };
    }
  };

  const SET_PATH_HISTORY = ({ value }) => {
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
      // Don't update state
      return { ...state };
    }
  };

  const SET_COMPLETE_END_PROMPT = ({ value: completeEndPrompt }) => ({
    ...state,
    completeEndPrompt,
  });

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
    SET_CURRENT_SHOT_AND_END,
    SET_SHOT_DETAILS,
    SET_SHOT_SAVE_ERRORS,
    SET_END_DETAILS,
    INITIALIZE_END,
    INITIALIZE_SHOT,
    SET_PATH_HISTORY,
    SET_LOADED,
    SET_COMPLETE_END_PROMPT,
    DEFAULT,
  };

  return (actions[action.type] || actions.DEFAULT)(action);
};

const useGameData = () => {
  const [gameState, dispatch] = useReducer(reducer, {
    game: {},
    ends: [],
    teams_with_players: [],
    currentShot: 0,
    currentEnd: 0,
    loaded: false,
    shotSaveErrors: null,
    completeEndPrompt: false,
  });

  // Get Initial Game details from API
  const loadGameData = (game_id) => {
    axios
      .get(`/api/games/${game_id}`)
      .then((res) => {
        dispatch({ type: SET_INITIAL_GAME_STATE, value: res.data });
      })
      .then(() => {
        dispatch({
          type: INITIALIZE_END,
          value: { end: gameState.currentEnd },
        });
      })
      .then(() => {
        dispatch({
          type: INITIALIZE_SHOT,
          value: { shot: gameState.currentShot, end: gameState.currentEnd },
        });
      })
      .then(() => {
        dispatch({ type: SET_LOADED, value: true });
      })
      .catch((err) => {
        console.log('err = ', err);
      });
  };

  // TODO: Set Throw order from user input -- implement later
  const setThrowOrder = (throw_order) => {
    dispatch({ type: SET_THROW_ORDER, value: throw_order });
  };

  const nextShot = () => {
    const { currentEnd, currentShot } = gameState;
    const newCurrentShot = currentShot + 1;

    if (newCurrentShot > 15 && gameState.currentEnd < 12) {
      console.log('Moving to next end');

      const nextEnd = currentEnd + 1;
      dispatch({ type: INITIALIZE_END, value: { end: nextEnd } });
      dispatch({ type: INITIALIZE_SHOT, value: { shot: 0, end: nextEnd } });

      if (
        gameState.ends[currentEnd].end.score_team1 !== null &&
        gameState.ends[currentEnd].end.score_team1 !== null
      ) {
        dispatch({type: SET_CURRENT_SHOT_AND_END, value: {currentShot: 0, currentEnd: nextEnd}})
      } else {
        dispatch({ type: SET_COMPLETE_END_PROMPT, value: true });
      }
    } else {
      console.log('initializing next shot');
      dispatch({
        type: INITIALIZE_SHOT,
        value: { shot: newCurrentShot, end: currentEnd },
      });

      dispatch({type: SET_CURRENT_SHOT_AND_END, value: {currentShot: newCurrentShot, currentEnd: currentEnd}})
    }
  };

  const prevShot = () => {
    const newCurrentShot = gameState.currentShot - 1;
    if (newCurrentShot >= 0) {
      dispatch({type: SET_CURRENT_SHOT_AND_END, value: {currentShot: newCurrentShot, currentEnd: gameState.currentEnd}})
      dispatch({ type: SET_SHOT_SAVE_ERRORS, value: null });
    }
  };

  const saveShot = () => {
    const currentEnd = gameState.currentEnd;
    const currentShot = gameState.currentShot;

    const shot = { ...gameState.ends[currentEnd].shots[currentShot] };

    shot.end_id = gameState.ends[currentEnd].end.id;
    shot.player_id = gameState.ends[currentEnd].end.throw_order[currentShot].id;

    if (shot.id) {
      // the shot already exists in the database so update instead of creating
      const shotId = shot.id;

      axios
        .patch(`api/shots/${shotId}`, shot)
        .then((res) => {
          if (res.data.errors) {
            dispatch({ type: SET_SHOT_SAVE_ERRORS, value: res.data.errors });
            return;
          }
          dispatch({ type: SET_SHOT_SAVE_ERRORS, value: null });
          dispatch({ type: SET_SHOT_DETAILS, value: res.data });
          nextShot();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // create new shot
      axios
        .post('/api/shots', shot)
        .then((res) => {
          if (res.data.errors) {
            dispatch({ type: SET_SHOT_SAVE_ERRORS, value: res.data.errors });
            return;
          }
          dispatch({ type: SET_SHOT_SAVE_ERRORS, value: null });
          dispatch({ type: SET_SHOT_DETAILS, value: res.data });
          nextShot();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const setShot = (shot) => {
    dispatch({type: SET_CURRENT_SHOT_AND_END, value: {currentShot: shot, currentEnd: gameState.currentEnd}})
  };

  const setEnd = (end) => {
    dispatch({ type: INITIALIZE_SHOT, value: { shot: 0, end: end } });
    dispatch({type: SET_CURRENT_SHOT_AND_END, value: {currentShot: 0, currentEnd: end}})
  }

  const startEnd = (first_team_id) => {
    const { currentEnd, teams_with_players, ends } = gameState;

    const throw_order = [];
    for (const teamObj of teams_with_players) {
      const teamOffset = teamObj.team.id === first_team_id ? 0 : 1;

      for (const player of teamObj.players) {
        const playerOffset = (player.throw_order - 1) * 4;
        throw_order[teamOffset + playerOffset] = player;
        throw_order[teamOffset + playerOffset + 2] = player;
      }
    }

    const end = {
      ...ends[currentEnd].end,
      first_team_id,
      throw_order,
    };

    if (end.id) {
      // the end already exists in the database so update instead of creating
      const endId = end.id;

      axios
        .patch(`api/ends/${endId}`, end)
        .then((res) => {
          dispatch({ type: SET_END_DETAILS, value: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // create new end
      axios
        .post('/api/ends', end)
        .then((res) => {
          dispatch({ type: SET_END_DETAILS, value: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const storeRockHistory = (positionValue) => {
    dispatch({ type: SET_PATH_HISTORY, value: positionValue });
  };

  const storeShotDetails = (detail) => {
    dispatch({ type: SET_SHOT_DETAILS, value: detail });
  };

  const finishEnd = ({ score_team1, score_team2 }) => {
    console.log(
      '\n****finsih end****\n',
      score_team1,
      score_team2
    );

    dispatch({ type: SET_COMPLETE_END_PROMPT, value: false });

    const { currentEnd } = gameState;

    const endId = gameState.ends[currentEnd].end.id;

    const end = { ...gameState.ends[currentEnd].end, score_team1, score_team2 };

    axios
      .patch(`api/ends/${endId}`, end)
      .then((res) => {
        dispatch({ type: SET_END_DETAILS, value: res.data });

        if (gameState.currentEnd < 12) {
          dispatch({type: SET_CURRENT_SHOT_AND_END, value: {currentShot: 0, currentEnd: gameState.currentEnd + 1}})
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    gameState,
    nextShot,
    prevShot,
    saveShot,
    setShot,
    setEnd,
    startEnd,
    storeRockHistory,
    storeShotDetails,
    finishEnd,
    loadGameData,
  };
};

export default useGameData;
