class CreateShots < ActiveRecord::Migration[6.0]
  def change
    create_table :shots do |t|
      t.integer :shot_number
      t.string :rotation
      t.integer :rating
      t.string :shot_type
      t.json :rock_paths
      t.text :comments
      t.json :target_position
      t.integer :sweep_score
      t.time :hog_time
      t.references :end
      t.references :player

      t.timestamps
    end
  end
end
