class Shot < ApplicationRecord
  belongs_to :player
  belongs_to :end
  validates :player, :end, :rock_paths, presence: true
  validates :shot_type, inclusion:   { in: %w(Draw Front Guard Raise Wick Freeze TakeOut HitAndRoll 
                                              Clearing DoubleTakeOut PromotionTakeOut NotScored) }
  validates :shot_number, inclusion: { in: 1..16,
                                       message: "must be a number between 1 and 16" },
                                       allow_nil: true
  validates :rotation, inclusion:    { in: %w(clockwise counterclockwise), 
                                       message: "must be either clockwise or counterclockwise" },
                                       allow_nil: true
  validates :rating, inclusion:      { in: 1..4, 
                                       message: "must be a number between 1 and 4" }, 
                                       allow_nil: true
  validates :sweep_score, inclusion: { in: 1..10,
                                       message: "must be a number bewtween 1 and 10" },
                                       allow_nil: true
                                      
                      
  

  # def not_scored_type?
  #   self.shot_type == 'NotScored'
  # end
end


# t.text "comments"
# t.json "target_position"
# t.time "hog_time"
