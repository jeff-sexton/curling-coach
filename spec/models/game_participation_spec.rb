# frozen_string_literal: true

require 'rails_helper'

RSpec.describe GameParticipation, type: :model do
  describe 'Validations' do
    let(:team) { Team.create!(id: 1, team_name: 'Test Team') }
    let(:game) { Game.create!(id: 1, location: 'Test Location', date_time: 3.days.ago, completed: false) }

    subject do
      described_class.new(
        id: 1,
        game_id: game[:id],
        team_id: team[:id]
      )
    end

    it 'is valid with all valid attributes' do
      expect(subject).to be_valid
    end

    it 'is not valid without team id' do
      subject.team_id = nil
      expect(subject).to_not be_valid
      expect(subject.errors.full_messages).to include("Team can't be blank")
    end

    it 'is not valid with a team id that does not exist' do
      subject.team_id = 5
      expect(subject).to_not be_valid
      expect(subject.errors.full_messages).to include('Team must exist')
    end

    it 'is not valid without game id' do
      subject.game_id = nil
      expect(subject).to_not be_valid
      expect(subject.errors.full_messages).to include("Game can't be blank")
    end

    it 'is not valid with a game id that does not exist' do
      subject.game_id = 5
      expect(subject).to_not be_valid
      expect(subject.errors.full_messages).to include('Game must exist')
    end
  end
end
