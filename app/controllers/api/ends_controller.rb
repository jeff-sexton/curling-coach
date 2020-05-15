class Api::EndsController < ApplicationController

  skip_before_action :verify_authenticity_token
  # Fix problem with ActionController::InvalidAuthenticityToken
  

  def index
    ends = End.find_each
    render json: ends
  end

  def create
    new_end = End.new(end_params)

    if new_end.save

      # convert nested json object to an array of objects before sending to the client
      new_end.throw_order = JSON.parse(new_end.throw_order)
      
      render json: new_end
    else
      render json: new_end.errors, status: :unprocessable_entity
    end


  end

  def update
  end

  private

  def end_params

    # Convert nested array of objects to json before storing in db
    params[:end][:throw_order] = params[:throw_order].to_json

    params.require(:end).permit(
      :game_id,
      :score_team1,
      :score_team2,
      :first_team_id,
      :throw_order,
    )
  end
end
