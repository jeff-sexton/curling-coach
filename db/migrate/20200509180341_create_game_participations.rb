class CreateGameParticipations < ActiveRecord::Migration[6.0]
  def change
    create_table :game_participations do |t|
      t.references :team
      t.references :game

      t.timestamps
    end
  end
end
