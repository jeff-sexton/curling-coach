class Api::StatsController < ApplicationController

  def show
    game_shots = Team.joins(players: [shots: [end: :game]]).where("games.id = ?", params[:id]).select('team_id, player_id, rotation, shot_type, sum(rating), count(*)').group( :team_id, :player_id, :rotation, :shot_type)

    game_stats = get_all_game_stats(game_shots)

    teams = Team.includes(:players, game_participations: :game).references(:games).where("games.id = ?", params[:id])

    data = teams.map { |team| 
      {
        team: team, 
        team_stats: game_stats[team.id][:team_stats], 
        players: team.players.map { |player|
          {
            player: player,
            player_stats: game_stats[team.id][:players][player.id]
          }
        }
      }
    }

    render json: data

  end

  private
  # Takes all game shots and returns tables for each team and each player
  def get_all_game_stats (shots)

    data_table = {}

    shots.each {|shot|

      # Create Team Id key if necessary
      if !data_table[shot.team_id]
        data_table[shot.team_id] = {team_stats: {}, players: {}}
      end
      # Create Player Id if necessary
      if !data_table[shot.team_id][:players][shot.player_id]
        data_table[shot.team_id][:players][shot.player_id] = {}
      end

      # Create Shot Type Rows
      add_to_row(shot.shot_type.to_sym, data_table[shot.team_id][:team_stats], shot)
      add_to_row(shot.shot_type.to_sym, data_table[shot.team_id][:players][shot.player_id], shot)
      
      # Create All Draws Rows
      if ['Draw','Front','Guard','Raise','Wick','Freeze'].include? shot.shot_type
        add_to_row(:all_draws, data_table[shot.team_id][:team_stats], shot)
        add_to_row(:all_draws, data_table[shot.team_id][:players][shot.player_id], shot)
      end

      # Create All Takeouts Rows
      if ['TakeOut','HitAndRoll','Clearing','DoubleTakeOut','PromotionTakeOut'].include? shot.shot_type
        add_to_row(:all_takeouts, data_table[shot.team_id][:team_stats], shot)
        add_to_row(:all_takeouts, data_table[shot.team_id][:players][shot.player_id], shot)
      end

      # Create total rows
      add_to_row(:total, data_table[shot.team_id][:team_stats], shot)
      add_to_row(:total, data_table[shot.team_id][:players][shot.player_id], shot)
    }

    data_table
  end

  def add_to_row (row_sym, data_table, shot)
    # create shot type keys if necessary
    if !data_table[row_sym] 
      data_table[row_sym] = {}
    end

    # Handle not_scored shots
    if shot.shot_type == 'NotScored'
      if row_sym == :total
        # Don't add not scored shots to total row
        return
      end

      data_table[row_sym].merge!({count: shot.count}) {|key, oldval, newval| oldval + newval}
      return # Skip to next shot in array
    end

    # create rotation key if necessary
    if !data_table[row_sym][shot.rotation.to_sym]
      data_table[row_sym][shot.rotation.to_sym] = {}
    end
    
    # add basic shot type data to appropiate keys - both team total and individual player  
    data_table[row_sym][shot.rotation.to_sym].merge!({sum: shot.sum, count: shot.count})  {|key, oldval, newval| oldval + newval}
   
    # Calculate percentage
    data_table[row_sym][shot.rotation.to_sym][:percent] = data_table[row_sym][shot.rotation.to_sym][:sum] / (data_table[row_sym][shot.rotation.to_sym][:count] * 4.0) * 100.00
    

    # Create combined key if necessary
    if !data_table[row_sym][:combined]
      data_table[row_sym][:combined] = {}
    end

    # add combined shots of types to appropiate keys      
    data_table[row_sym][:combined].merge!({sum: shot.sum, count: shot.count})  {|key, oldval, newval| oldval + newval}
    
    # Calculate combined percentage
    data_table[row_sym][:combined][:percent] = data_table[row_sym][:combined][:sum] / (data_table[row_sym][:combined][:count] * 4.0) * 100.00
  end

  # Takes a filtered selection of shots and returns a stats table based on them
  def get_stats_table (shots)
    data_table = {}

    shots.each {|shot|       
      # Create Shot Type Rows
      add_to_row(shot.shot_type.to_sym, data_table, shot)

      # Create All Draws Rows
      if ['Draw','Front','Guard','Raise','Wick','Freeze'].include? shot.shot_type
        add_to_row(:all_draws, data_table, shot)
      end

      # Create All Takeouts Rows
      if ['TakeOut','HitAndRoll','Clearing','DoubleTakeOut','PromotionTakeOut'].include? shot.shot_type
        add_to_row(:all_takeouts, data_table, shot)
      end

      # Create total rows
      add_to_row(:total, data_table, shot)
    }

    data_table
  end
end
