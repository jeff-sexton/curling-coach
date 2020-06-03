# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Player, type: :model do
  describe 'Validations' do
    let(:team) { Team.create!(id: 1, team_name: 'Test Team') }

    subject do
      described_class.new(
        id: 1,
        name: 'Test Player',
        throw_order: 1,
        team_id: team[:id]
      )
    end

    it 'is valid with all valid attributes' do
      expect(subject).to be_valid
    end

    it 'is not valid without a name' do
      subject.name = nil
      expect(subject).to_not be_valid
      expect(subject.errors.full_messages).to include("Name can't be blank")
    end

    it 'is not valid without a throw order' do
      subject.throw_order = nil
      expect(subject).to_not be_valid
      expect(subject.errors.full_messages).to include('Throw order must be a number between 1 and 4')
    end
    it 'is not valid with a throw order out of range' do
      subject.throw_order = 5
      expect(subject).to_not be_valid
      expect(subject.errors.full_messages).to include('Throw order must be a number between 1 and 4')
    end
  end
end
