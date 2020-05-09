class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.datetime :date_time
      t.string :location
      t.boolean :completed

      t.timestamps
    end
  end
end
