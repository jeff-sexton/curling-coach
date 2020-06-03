# frozen_string_literal: true

require 'rails_helper'

RSpec.describe End, type: :model do
  describe 'Validations' do
    let(:game) { Game.create!(id: 1, location: 'Test Location', date_time: 3.days.ago, completed: false) }

    subject do
      described_class.new(
        id: 1,
        game_id: game[:id],
        first_team_id: 1,
        throw_order: nil,
        score_team1: nil,
        score_team2: nil
      )
    end

    it 'is valid with all valid attributes' do
      expect(subject).to be_valid
    end

    it 'is not valid without a game id' do
      subject.game_id = nil
      expect(subject).to_not be_valid
      expect(subject.errors.full_messages).to include("Game can't be blank")
    end
    it 'is not valid without a valid game id' do
      subject.game_id = 5
      expect(subject).to_not be_valid
      expect(subject.errors.full_messages).to include('Game must exist')
    end

    it 'is not valid with a non integer team 1 score' do
      subject.score_team1 = 5.1
      expect(subject).to_not be_valid
      expect(subject.errors.full_messages).to include('Score team1 must be an integer')
    end

    it 'is not valid with a non integer team 2 score' do
      subject.score_team2 = 'apple'
      expect(subject).to_not be_valid
      expect(subject.errors.full_messages).to include('Score team2 is not a number')
    end
  end
end
