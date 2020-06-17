# frozen_string_literal: true

class Api::TeamsController < ApplicationController
  skip_before_action :verify_authenticity_token
  # Fix problem with ActionController::InvalidAuthenticityToken

  def index
    teams = Team.all

    render json: teams
  end
end
