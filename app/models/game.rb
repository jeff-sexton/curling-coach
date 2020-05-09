class Game < ApplicationRecord
  has_many :game_participations
  has_many :ends
end
