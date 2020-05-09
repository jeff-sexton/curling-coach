class Team < ApplicationRecord
  has_many :game_participations
  has_many :players
end
