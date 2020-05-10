class GameParticipation < ApplicationRecord
  belongs_to :team
  belongs_to :game
  validates :team, :game, presence: true
end
