class Api::EndsController < ApplicationController
  def index
    ends = End.find_each
    render json: ends
  end

  def update
  end

  private
end
