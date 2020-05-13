class AddFirstTeamToEnds < ActiveRecord::Migration[6.0]
  def change
    add_column :ends, :first_team_id, :integer
    add_column :ends, :throw_order, :json
  end
end
