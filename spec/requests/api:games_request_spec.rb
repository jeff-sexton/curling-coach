# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api:games', type: :request do
  # Setup
  before :each do
    @game1 = Game.create!({
                            id: 1,
                            date_time: 3.days.ago,
                            location: 'Game1Location',
                            completed: false
                          })
    @team1 = Team.find_or_create_by!({ id: 1, team_name: 'Team1' })
    @team2 = Team.find_or_create_by!({ id: 2, team_name: 'Team2' })
    @team3 = Team.find_or_create_by!({ id: 3, team_name: 'Team3' })
    @team4 = Team.find_or_create_by!({ id: 4, team_name: 'Team4' })
    @game1.game_participations.create!({
                                         team_id: 1
                                       })

    @game1.game_participations.create!({
                                         team_id: 2
                                       })

    @game2 = Game.create!({
                            id: 2,
                            date_time: 3.days.ago,
                            location: 'Game2Location',
                            completed: false
                          })
    @game2.game_participations.create!({
                                         team_id: 3
                                       })

    @game2.game_participations.create!({
                                         team_id: 4
                                       })
  end
  describe '.index' do
    before :each do
      headers = { 'ACCEPT' => 'application/json' }
      get '/api/games', params: {}, headers: headers
    end

    it 'responds with a valid json' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(response).to have_http_status(:ok)
    end

    it 'response contains all defined games and associated teams' do
      expect(response.body).to include('Game1Location')
      expect(response.body).to include('Game2Location')
      expect(response.body).to include('Team1')
      expect(response.body).to include('Team2')
      expect(response.body).to include('Team3')
      expect(response.body).to include('Team4')
    end

    it 'response is an array of hashes' do
      data = JSON.parse(response.body)
      expect(data).to be_an_instance_of(Array)
      expect(data[0]).to be_an_instance_of(Hash)
    end
  end

  describe '.show' do
    it 'responds with a valid json' do
      headers = { 'ACCEPT' => 'application/json' }
      get "/api/games/#{@game1[:id]}", params: {}, headers: headers

      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(response).to have_http_status(:ok)
    end
  end
end
