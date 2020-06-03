require 'rails_helper'

RSpec.describe Team, type: :model do
  describe 'Validations' do
    subject do
      described_class.new(
        id: 1,
        team_name: 'Test Team',
      )
    end

    it 'is valid with all valid attributes' do
      expect(subject).to be_valid
    end

    it 'is not valid without a team name' do
      subject.team_name = nil
      expect(subject).to_not be_valid
      expect(subject.errors.full_messages).to include("Team name can't be blank")
    end
  end

end
