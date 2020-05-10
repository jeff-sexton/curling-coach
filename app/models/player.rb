class Player < ApplicationRecord
  has_many :shots
  belongs_to :team
  validates :team, :name, presence: true
  validates :throw_order, inclusion: { in: 1..4, message: "must be a number between 1 and 4" }
end


