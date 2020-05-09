class CreatePlayers < ActiveRecord::Migration[6.0]
  def change
    create_table :players do |t|
      t.string :name
      t.integer :throw_order
      t.references :team

      t.timestamps
    end
  end
end
