class Player < ApplicationRecord
  has_many :shots
  belongs_to :team
end
