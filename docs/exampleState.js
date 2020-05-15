const exampleState = {
  games: [
    {
      game_id: 1,
      game_date: '',
      location: '',
      status: 'completed',
      team1_game_score: 7,
      team2_game_score: 5,
      teams: {
        team1: {
          team_name: 'The Best',
          players: [
            {
              id: 12334,
              name: 'Name',
            },
            {},
            {},
            {},
          ],
        },
        team2: {},
      },
      ends: [
        {
          id: 1,
          team1_end_score: 1,
          team2_end_score: 0,
          shots: [
            {
              id: 13344,
              shot_number: 1,
              rotation: '',
              rating: 0,
              type: '',
              comments: [],
              rock_paths: [
                { id: 1, x: 50, y: 50 },
                { id: 2, x: 50, y: 50 },
                { id: 3, x: 50, y: 50 },
                { id: 4, x: 50, y: 50 },
                { id: 5, x: 50, y: 50 },
                { id: 6, x: 50, y: 50 },
                { id: 7, x: 50, y: 50 },
                { id: 8, x: 50, y: 50 },
                { id: 9, x: 50, y: 50 },
                { id: 10, x: 50, y: 50 },
                { id: 11, x: 50, y: 50 },
                { id: 12, x: 50, y: 50 },
                { id: 13, x: 50, y: 50 },
                { id: 14, x: 50, y: 50 },
                { id: 15, x: 50, y: 50 },
                { id: 16, x: 50, y: 50 },
              ],
            },
          ],
        },
        {},
        {},
      ],
    },
  ],
  teams: [],
  players: [],
};

const dashBoardState = [
  {
    game: {
      id: 1,
      location: 'string',
      otherkeys: '',
    },
    teams: [
      {
        id: 1,
        team_name: '',
        otherkeys: '',
      },
      {
        id: 2,
        team_name: '',
        otherkeys: '',
      },
    ],
  },
  {
    game: {
      id: 2,
      location: 'string',
      otherkeys: '',
    },
    teams: [
      {
        id: 3,
        team_name: '',
        otherkeys: '',
      },
      {
        id: 99,
        team_name: '',
        otherkeys: '',
      },
    ],
  },
];
