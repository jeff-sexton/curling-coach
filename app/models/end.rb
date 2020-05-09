class End < ApplicationRecord
  has_many :shots
  belongs_to :game
  validates :score_team1, :score_team2, numericality: { only_integer: true }
  validates :game, presence: true
end


