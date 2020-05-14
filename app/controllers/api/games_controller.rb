class Api::GamesController < ApplicationController
  def index
  end

  def show
    game = Game.find(params[:id])
    # ends = game.ends.map { |curl_end| { end: curl_end, shots: curl_end.shots }}
    ends = game.ends.map do |curl_end|

      # convert nested json object to an array of objects before sending to the client
      curl_end.throw_order = JSON.parse(curl_end.throw_order)
      
      shots = curl_end.shots

      # Parse rock paths back to an array of hashes before sending to client
      shots.map do |shot|
        if (shot.rock_paths)
          shot.rock_paths = JSON.parse(shot.rock_paths)
        end
        shot
      end
      
      { end: curl_end, shots: shots}
    end
    teams = game.game_participations.map { |participation| { team: participation.team, players: participation.team.players}}

    game_details = { 
      game: game, 
      ends: ends,
      teams_with_players: teams,
    } 

    render json: game_details
  end

  def create
  end

  def edit
  end

  private
  
end
