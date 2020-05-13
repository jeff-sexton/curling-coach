class Api::ShotsController < ApplicationController

  skip_before_action :verify_authenticity_token
  # Fix problem with ActionController::InvalidAuthenticityToken
  
  def index
  end

  def create
    shot = Shot.new(shot_params)

    if shot.save
      
      # Parse rock paths back to an array of hashes before sending to client
      shot.rock_paths = JSON.parse(shot.rock_paths)

      render json: shot
    else
      render json: shot.errors, status: :unprocessable_entity
    end
  end

  def update
  end

  private

  def shot_params
    params.require(:shot).permit(
      :end_id,
      :shot_number,
      :rotation,
      :rating,
      :shot_type,
      :rock_paths.as_json,
      :player_id,
    )
  end
  
end
