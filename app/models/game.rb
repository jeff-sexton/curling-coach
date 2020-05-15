class Game < ApplicationRecord
  has_many :game_participations
  has_many :ends
  has_many :teams, through: :game_participations
  validates :date_time, :location, presence: true
  validates :completed, inclusion: { in: [true, false], message: "value must be either true or false" }          
end
