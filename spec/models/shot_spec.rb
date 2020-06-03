# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Shot, type: :model do
  describe 'Validations' do
    let(:team) { Team.create!(id: 1, team_name: 'Test Team') }
    let(:player) { Player.create!(id: 1, name: 'Test Player', throw_order: 1, team_id: team[:id]) }
    let(:game) { Game.create!(id: 1, location: 'Test Location', date_time: 3.days.ago, completed: false) }
    let(:test_end) { End.create!(id: 1, game_id: game[:id]) }
    subject do
      described_class.new(
        id: 1,
        shot_number: 1,
        rotation: 'counterclockwise',
        rating: 4,
        shot_type: 'Draw',
        rock_paths: '[{},{}]',
        end_id: test_end[:id],
        player_id: player[:id]
      )
    end

    it 'is valid with all valid attributes' do
      expect(subject).to be_valid
    end

    it 'is not valid without a end id' do
      subject.end_id = nil
      expect(subject).to_not be_valid
      expect(subject.errors.full_messages).to include("End can't be blank")
    end
    it 'is not valid without a valid end id' do
      subject.end_id = 5
      expect(subject).to_not be_valid
      expect(subject.errors.full_messages).to include('End must exist')
    end
    it 'is not valid without a player id' do
      subject.player_id = nil
      expect(subject).to_not be_valid
      expect(subject.errors.full_messages).to include("Player can't be blank")
    end
    it 'is not valid without a valid player id' do
      subject.player_id = 5
      expect(subject).to_not be_valid
      expect(subject.errors.full_messages).to include('Player must exist')
    end

    it 'is not valid without a valid shot_type' do
      subject.shot_type = 'trick shot'
      expect(subject).to_not be_valid
      expect(subject.errors.full_messages).to include('Shot type is not included in the list')
    end
    it 'is not valid without a valid rotation' do
      subject.rotation = 'none'
      expect(subject).to_not be_valid
      expect(subject.errors.full_messages).to include('Rotation must be either clockwise or counterclockwise')
    end
    it 'is not valid without a shot number' do
      subject.shot_number = nil
      expect(subject).to_not be_valid
      expect(subject.errors.full_messages).to include('Shot number must be a number between 1 and 16')
    end
    it 'is not valid without a valid shot number' do
      subject.shot_number = 77
      expect(subject).to_not be_valid
      expect(subject.errors.full_messages).to include('Shot number must be a number between 1 and 16')
    end
    it 'is not valid without a rating' do
      subject.rating = nil
      expect(subject).to_not be_valid
      expect(subject.errors.full_messages).to include("Rating must be a number between 1 and 4")
    end
    it 'is not valid without a valid rating' do
      subject.rating = 77
      expect(subject).to_not be_valid
      expect(subject.errors.full_messages).to include("Rating must be a number between 1 and 4")
    end

    it 'is valid without a rating when the shot type is NotScored' do
      subject.rating = nil
      subject.shot_type = 'NotScored'
      expect(subject).to be_valid
    end
    it 'is valid without a rotation when the shot type is NotScored' do
      subject.rotation = nil
      subject.shot_type = 'NotScored'
      expect(subject).to be_valid
    end
  end
end
