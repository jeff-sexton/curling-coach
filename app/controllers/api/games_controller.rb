class Api::GamesController < ApplicationController
  def index
    @games = Game.find_each
    render json: @games
  end

  def create
  end

  def edit
  end

end
