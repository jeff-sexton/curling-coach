require 'rails_helper'

RSpec.describe Game, type: :model do
  describe 'Validations' do

    subject do
      described_class.new(
        id: 1,
        location: 'Test location',
        date_time: 3.days.ago,
        completed: false
      )
    end

    it 'is valid with all valid attributes' do
      expect(subject).to be_valid
    end

    it 'is not valid without a location' do
      subject.location = nil
      expect(subject).to_not be_valid
      expect(subject.errors.full_messages).to include("Location can't be blank")
    end
    it 'is not valid without a date & time' do
      subject.date_time = nil
      expect(subject).to_not be_valid
      expect(subject.errors.full_messages).to include("Date time can't be blank")
    end
    it 'is not valid without a proper date_time string' do
      subject.date_time = 'happy'
      expect(subject).to_not be_valid
      expect(subject.errors.full_messages).to include("Date time can't be blank")
    end
    it 'is not valid without a completed status' do
      subject.completed = nil
      expect(subject).to_not be_valid
      expect(subject.errors.full_messages).to include("Completed value must be either true or false")
    end
  end
end
