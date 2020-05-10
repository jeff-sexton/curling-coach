class End < ApplicationRecord
  has_many :shots
  belongs_to :game
  validates :game, presence: true
  validates :score_team1, :score_team2, numericality: { only_integer: true }, allow_nil: true
end


