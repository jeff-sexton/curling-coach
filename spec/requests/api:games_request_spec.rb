# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api:games', type: :request do
  # Setup
  before :each do
    @game1 = Game.create!({
                            date_time: 3.days.ago,
                            location: 'Vancouver',
                            completed: false
                          })
    @team1 = Team.find_or_create_by!({ id: 1, team_name: "Jeff's Team" })
    @team2 = Team.find_or_create_by!({ id: 2, team_name: "Yasu's Team" })
    @game1.game_participations.create!({
                                         team_id: 1
                                       })

    @game1.game_participations.create!({
                                         team_id: 2
                                       })
  end
  describe '.index' do
    it 'responds with a valid json' do
      headers = { 'ACCEPT' => 'application/json' }
      get '/api/games', params: {}, headers: headers

      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(response).to have_http_status(:ok)
    end

    it 'response contains the correct data' do
      headers = { 'ACCEPT' => 'application/json' }
      get '/api/games', params: {}, headers: headers
      
      expect(response.body).to include('Vancouver')
      expect(response.body).to include("Jeff's Team")
    end
  end
end
