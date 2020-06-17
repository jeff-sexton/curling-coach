class Api::GamesController < ApplicationController
  def index
    game = Game.all

    render json: game, include: :teams
  end

  def show
    game = Game.find(params[:id])
    # ends = game.ends.map { |curl_end| { end: curl_end, shots: curl_end.shots }}
    ends = game.ends.order(:id).map do |curl_end|

      # convert nested json object to an array of objects before sending to the client
      if curl_end.throw_order
        curl_end.throw_order = JSON.parse(curl_end.throw_order)
      end
      
      shots = curl_end.shots.order(:shot_number)

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
    game = Game.new(location: params[:location], date_time: params[:date_time], completed: params[:completed])

    if game.save
      game.game_participations.create({team_id: params[:team1_id]})
      game.game_participations.create({team_id: params[:team2_id]})

      render json: game
    else
      render json: { errors: game.errors.messages }

    end
    # puts params
  end

  def edit
  end

  private
  
end
