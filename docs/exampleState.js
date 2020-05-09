const exampleState = {
  games: [
    {
      game_id: 1,
      game_date: "",
      location: "",
      status: "completed",
      team1_game_score: 7,
      team2_game_score: 5,
      teams: {
        team1:
          {
            team_name: "The Best",
            players: 
              [
                {
                  id: 12334,
                  name: "Name",
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
              rotation: "",
              rating: 0,
              type: "",
              comments: [],
            },
          ],
        },
        {},
        {},
      ],
    },
  ],
  teams: [],
  players: []
  
};
