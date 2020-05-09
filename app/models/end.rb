class End < ApplicationRecord
  has_many :shots
  belongs_to :game
end
