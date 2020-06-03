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
      expect(response.body).to include(@game1[:location])
      expect(response.body).to include(@game2[:location])
      expect(response.body).to include(@team1[:team_name])
      expect(response.body).to include(@team2[:team_name])
      expect(response.body).to include(@team3[:team_name])
      expect(response.body).to include(@team4[:team_name])
    end

    it 'response is an array of hashes' do
      data = JSON.parse(response.body)
      expect(data).to be_an_instance_of(Array)
      expect(data[0]).to be_an_instance_of(Hash)
    end
  end

  describe '.show' do
    before :each do
      headers = { 'ACCEPT' => 'application/json' }
      get "/api/games/#{@game1[:id]}", params: {}, headers: headers
    end
    it 'responds with a valid json' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(response).to have_http_status(:ok)
    end

    it 'response contains only the specified game' do
      expect(response.body).to include(@game1[:location])
      expect(response.body).to_not include(@game2[:location])
    end

    it 'response is an object with all expected keys ' do
      data = JSON.parse(response.body)

      expect(data['game']).to eq(JSON.parse(@game1.to_json))
      expect(data['ends']).to be_an_instance_of(Array)
      expect(data['teams_with_players']).to be_an_instance_of(Array)
      expect(data['teams_with_players'][0]['team']).to include('id' => @team1[:id])
      expect(data['teams_with_players'][0]['players']).to be_an_instance_of(Array)
    end
  end
end
