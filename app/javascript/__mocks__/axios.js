import dashboardData from './dashboardViewSeed';
import gameData from './gameViewSeed';

import WS from 'jest-websocket-mock';

const server = new WS('ws://localhost:8080');

const fixtures = {};

const cleanUpFixture = () => {
  fixtures.games = dashboardData;
  fixtures.game = gameData;
};

export { cleanUpFixture };

const get = jest.fn((url) => {
  const lookup = {
    '/api/games': 'games',
    '/api/game/2': 'game',
  };

  const response = Promise.resolve({
    status: 200,
    statusText: 'OK',
    data: fixtures[lookup[url]],
  });

  return (lookup[url] && response) || Promise.reject();
});

const put = jest.fn((url, payload) => {
  const { id, interview } = payload;
  // Update day spots
  fixtures.appointments[id].interview = interview;

  // mimic WebSocket message
  const response = JSON.stringify({
    type: 'SET_INTERVIEW',
    id,
    interview,
  });

  setTimeout(() => {
    server.send(response);
    // do something with websockets
  }, 2000);

  return Promise.resolve({ status: 204, statusText: 'No Content' });
});


const axios = {
  get,
  put,
};

export default axios;
