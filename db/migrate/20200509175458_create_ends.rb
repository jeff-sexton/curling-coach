class CreateEnds < ActiveRecord::Migration[6.0]
  def change
    create_table :ends do |t|
      t.integer :score_team1
      t.integer :score_team2
      t.references :game

      t.timestamps
    end
  end
end
