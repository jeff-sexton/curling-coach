class Api::StatsController < ApplicationController

  def show    
    # game_shots = Shot.joins(end: :game, player: :team).where("games.id = ?", params[:id])
    # teams = Team.joins(game_participations: :game).where("games.id = ?", params[:id])
    
    # game_stats = teams.map {|team| 
    #   {
    #     team: team, 
    #     team_stats: {
    #       clockwise: 
    #       { 
    #         count: game_shots.where("teams.id = ? AND shots.rotation = 'clockwise'", team.id).group(:shot_type).count(:rating), 
    #         sum: game_shots.where("teams.id = ? AND shots.rotation = 'clockwise'", team.id).group(:shot_type).sum(:rating), 
    #         all_draws_count: game_shots.where("teams.id = ? AND shots.rotation = 'clockwise'", team.id).where(shot_type: ['Draw','Front','Guard','Raise','Wick','Freeze']).count(:rating), 
    #         all_draws_sum: game_shots.where("teams.id = ? AND shots.rotation = 'clockwise'", team.id).where(shot_type: ['Draw','Front','Guard','Raise','Wick','Freeze']).sum(:rating), 
    #         all_takeouts_count: game_shots.where("teams.id = ? AND shots.rotation = 'clockwise'", team.id).where(shot_type: ['TakeOut','HitAndRoll','Clearing','DoubleTakeOut','PromotionTakeOut']).count(:rating), 
    #         all_takeouts_sum: game_shots.where("teams.id = ? AND shots.rotation = 'clockwise'", team.id).where(shot_type: ['TakeOut','HitAndRoll','Clearing','DoubleTakeOut','PromotionTakeOut']).sum(:rating), 
    #         total_count: game_shots.where("teams.id = ? AND shots.rotation = 'clockwise'", team.id).count(:rating), 
    #         total_sum: game_shots.where("teams.id = ? AND shots.rotation = 'clockwise'", team.id).sum(:rating), 
    #       },
    #       counterclockwise: 
    #       { 
    #         count: game_shots.where("teams.id = ? AND shots.rotation = 'counterclockwise'", team.id).group(:shot_type).count(:rating), 
    #         sum: game_shots.where("teams.id = ? AND shots.rotation = 'counterclockwise'", team.id).group(:shot_type).sum(:rating),
    #         all_draws_count: game_shots.where("teams.id = ? AND shots.rotation = 'counterclockwise'", team.id).where(shot_type: ['Draw','Front','Guard','Raise','Wick','Freeze']).count(:rating), 
    #         all_draws_sum: game_shots.where("teams.id = ? AND shots.rotation = 'counterclockwise'", team.id).where(shot_type: ['Draw','Front','Guard','Raise','Wick','Freeze']).sum(:rating), 
    #         all_takeouts_count: game_shots.where("teams.id = ? AND shots.rotation = 'counterclockwise'", team.id).where(shot_type: ['TakeOut','HitAndRoll','Clearing','DoubleTakeOut','PromotionTakeOut']).count(:rating), 
    #         all_takeouts_sum: game_shots.where("teams.id = ? AND shots.rotation = 'counterclockwise'", team.id).where(shot_type: ['TakeOut','HitAndRoll','Clearing','DoubleTakeOut','PromotionTakeOut']).sum(:rating), 
    #         total_count: game_shots.where("teams.id = ? AND shots.rotation = 'counterclockwise'", team.id).count(:rating), 
    #         total_sum: game_shots.where("teams.id = ? AND shots.rotation = 'counterclockwise'", team.id).sum(:rating), 
    #       },
    #       combined: 
    #       { 
    #         count: game_shots.where("teams.id = ?", team.id).group(:shot_type).count(:rating), 
    #         sum: game_shots.where("teams.id = ?", team.id).group(:shot_type).sum(:rating),
    #         all_draws_count: game_shots.where("teams.id = ?", team.id).where(shot_type: ['Draw','Front','Guard','Raise','Wick','Freeze']).count(:rating), 
    #         all_draws_sum: game_shots.where("teams.id = ?", team.id).where(shot_type: ['Draw','Front','Guard','Raise','Wick','Freeze']).sum(:rating), 
    #         all_takeouts_count: game_shots.where("teams.id = ?", team.id).where(shot_type: ['TakeOut','HitAndRoll','Clearing','DoubleTakeOut','PromotionTakeOut']).count(:rating), 
    #         all_takeouts_sum: game_shots.where("teams.id = ?", team.id).where(shot_type: ['TakeOut','HitAndRoll','Clearing','DoubleTakeOut','PromotionTakeOut']).sum(:rating), 
    #         total_count: game_shots.where("teams.id = ?", team.id).count(:rating), 
    #         total_sum: game_shots.where("teams.id = ?", team.id).sum(:rating), 
    #       },
    #     },
    #     players: team.players.map {|player|
    #       {
    #         player: player,
    #         player_stats: {
    #           clockwise: 
    #           { 
    #             count: game_shots.where("player_id = ? AND shots.rotation = 'clockwise'", player.id).group(:shot_type).count(:rating), 
    #             sum: game_shots.where("player_id = ? AND shots.rotation = 'clockwise'", player.id).group(:shot_type).sum(:rating),
    #             all_draws_count: game_shots.where("player_id = ? AND shots.rotation = 'clockwise'", player.id).where(shot_type: ['Draw','Front','Guard','Raise','Wick','Freeze']).count(:rating), 
    #             all_draws_sum: game_shots.where("player_id = ? AND shots.rotation = 'clockwise'", player.id).where(shot_type: ['Draw','Front','Guard','Raise','Wick','Freeze']).sum(:rating), 
    #             all_takeouts_count: game_shots.where("player_id = ? AND shots.rotation = 'clockwise'", player.id).where(shot_type: ['TakeOut','HitAndRoll','Clearing','DoubleTakeOut','PromotionTakeOut']).count(:rating), 
    #             all_takeouts_sum: game_shots.where("player_id = ? AND shots.rotation = 'clockwise'", player.id).where(shot_type: ['TakeOut','HitAndRoll','Clearing','DoubleTakeOut','PromotionTakeOut']).sum(:rating), 
    #             total_count: game_shots.where("player_id = ? AND shots.rotation = 'clockwise'", player.id).count(:rating), 
    #             total_sum: game_shots.where("player_id = ? AND shots.rotation = 'clockwise'", player.id).sum(:rating), 
    #           },
    #           counterclockwise: 
    #           { 
    #             count: game_shots.where("player_id = ? AND shots.rotation = 'counterclockwise'", player.id).group(:shot_type).count(:rating), 
    #             sum: game_shots.where("player_id = ? AND shots.rotation = 'counterclockwise'", player.id).group(:shot_type).sum(:rating),
    #             all_draws_count: game_shots.where("player_id = ? AND shots.rotation = 'counterclockwise'", player.id).where(shot_type: ['Draw','Front','Guard','Raise','Wick','Freeze']).count(:rating), 
    #             all_draws_sum: game_shots.where("player_id = ? AND shots.rotation = 'counterclockwise'", player.id).where(shot_type: ['Draw','Front','Guard','Raise','Wick','Freeze']).sum(:rating), 
    #             all_takeouts_count: game_shots.where("player_id = ? AND shots.rotation = 'counterclockwise'", player.id).where(shot_type: ['TakeOut','HitAndRoll','Clearing','DoubleTakeOut','PromotionTakeOut']).count(:rating), 
    #             all_takeouts_sum: game_shots.where("player_id = ? AND shots.rotation = 'counterclockwise'", player.id).where(shot_type: ['TakeOut','HitAndRoll','Clearing','DoubleTakeOut','PromotionTakeOut']).sum(:rating), 
    #             total_count: game_shots.where("player_id = ? AND shots.rotation = 'counterclockwise'", player.id).count(:rating), 
    #             total_sum: game_shots.where("player_id = ? AND shots.rotation = 'counterclockwise'", player.id).sum(:rating),  
    #           },
    #           combined: 
    #           { 
    #             count: game_shots.where("player_id = ?", player.id).group(:shot_type).count(:rating), 
    #             sum: game_shots.where("player_id = ?", player.id).group(:shot_type).sum(:rating),
    #             all_draws_count: game_shots.where("player_id = ?", player.id).where(shot_type: ['Draw','Front','Guard','Raise','Wick','Freeze']).count(:rating), 
    #             all_draws_sum: game_shots.where("player_id = ?", player.id).where(shot_type: ['Draw','Front','Guard','Raise','Wick','Freeze']).sum(:rating), 
    #             all_takeouts_count: game_shots.where("player_id = ?", player.id).where(shot_type: ['TakeOut','HitAndRoll','Clearing','DoubleTakeOut','PromotionTakeOut']).count(:rating), 
    #             all_takeouts_sum: game_shots.where("player_id = ?", player.id).where(shot_type: ['TakeOut','HitAndRoll','Clearing','DoubleTakeOut','PromotionTakeOut']).sum(:rating), 
    #             total_count: game_shots.where("player_id = ?", player.id).count(:rating), 
    #             total_sum: game_shots.where("player_id = ?", player.id).sum(:rating), 
    #           },
    #         },
    #       }
    #     }
    #   }
    # }


    







    # teams = Team.includes(players: [shots: [end: :game]]).references(:games).where("games.id = ?", params[:id])

    # data = teams.map {|team| {team: team, team_stats: get_team_stats(team, team.id), players: team.players}}

      


    game_shots = Team.joins(players: [shots: [end: :game]]).where("games.id = ?", params[:id]).select('team_id, player_id, rotation, shot_type, sum(rating), count(*)').group( :team_id, :player_id, :rotation, :shot_type)
    
    data = {
      stats: get_all_game_stats(game_shots),
      # team1: get_stats_table(game_shots.where('team_id = ?', 4)),
      # team2: get_stats_table(game_shots.where('team_id = ?', 5)),
      # player13: get_stats_table(game_shots.where('player_id = ?', 13)),
      # player14: get_stats_table(game_shots.where('player_id = ?', 14)),
      # player15: get_stats_table(game_shots.where('player_id = ?', 15)),
      # player16: get_stats_table(game_shots.where('player_id = ?', 16)),
      # player17: get_stats_table(game_shots.where('player_id = ?', 17)),
      # player18: get_stats_table(game_shots.where('player_id = ?', 18)),
      # player19: get_stats_table(game_shots.where('player_id = ?', 19)),
      # player20: get_stats_table(game_shots.where('player_id = ?', 20)),
    }
    

    render json: data
    # render json: game_shots

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
    # Handle not_scored shots
    if shot.shot_type == 'NotScored'
      data_table[:not_scored].merge!({count: shot.count}) {|key, oldval, newval| oldval + newval}
      return # Skip to next shot in array
    end

    # create shot type keys if necessary
    if !data_table[row_sym] 
      data_table[row_sym] = {}
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


  def add_to_multiple_rows (row_sym, data_table, shot)
    # create rotation key if necessary
    if !data_table[shot.team_id][:team_stats][row_sym][shot.rotation.to_sym]
      data_table[shot.team_id][:team_stats][row_sym][shot.rotation.to_sym] = {}
    end
    if !data_table[shot.team_id][:players][shot.player_id][row_sym][shot.rotation.to_sym]
      data_table[shot.team_id][:players][shot.player_id][row_sym][shot.rotation.to_sym] = {}
    end
    
    # add basic shot type data to appropiate keys - both team total and individual player  
    data_table[shot.team_id][:team_stats][row_sym][shot.rotation.to_sym].merge!({sum: shot.sum, count: shot.count})  {|key, oldval, newval| oldval + newval}
    data_table[shot.team_id][:players][shot.player_id][row_sym][shot.rotation.to_sym].merge!({sum: shot.sum, count: shot.count})  {|key, oldval, newval| oldval + newval}
    
    # Calculate percentage
    data_table[shot.team_id][:team_stats][row_sym][shot.rotation.to_sym][:percent] = data_table[shot.team_id][:team_stats][row_sym][shot.rotation.to_sym][:sum] / (data_table[shot.team_id][:team_stats][row_sym][shot.rotation.to_sym][:count] * 4.0) * 100.00
    data_table[shot.team_id][:players][shot.player_id][row_sym][shot.rotation.to_sym][:percent] = data_table[shot.team_id][:players][shot.player_id][row_sym][shot.rotation.to_sym][:sum] / (data_table[shot.team_id][:players][shot.player_id][row_sym][shot.rotation.to_sym][:count] * 4.0) * 100.00
    
    # Create combined key if necessary
    if !data_table[shot.team_id][:team_stats][row_sym][:combined]
      data_table[shot.team_id][:team_stats][row_sym][:combined] = {}
    end
    if !data_table[shot.team_id][:players][shot.player_id][row_sym][:combined]
      data_table[shot.team_id][:players][shot.player_id][row_sym][:combined] = {}
    end

    # add combined shots of types to appropiate keys      
    data_table[shot.team_id][:team_stats][row_sym][:combined].merge!({sum: shot.sum, count: shot.count})  {|key, oldval, newval| oldval + newval}
    data_table[shot.team_id][:players][shot.player_id][row_sym][:combined].merge!({sum: shot.sum, count: shot.count})  {|key, oldval, newval| oldval + newval}
    
    # Calculate combined percentage
    data_table[shot.team_id][:team_stats][row_sym][:combined][:percent] = data_table[shot.team_id][:team_stats][row_sym][:combined][:sum] / (data_table[shot.team_id][:team_stats][row_sym][:combined][:count] * 4.0) * 100.00
    data_table[shot.team_id][:players][shot.player_id][row_sym][:combined][:percent] = data_table[shot.team_id][:players][shot.player_id][row_sym][:combined][:sum] / (data_table[shot.team_id][:players][shot.player_id][row_sym][:combined][:count] * 4.0) * 100.00
  end

  # Takes a filtered selection of shots and returns a stats table based on them
  def get_stats_table (shots)
    data_table = {}

    shots.each {|shot| 
      # create shot type keys if necessary
      if !data_table[shot.shot_type.to_sym] 
        data_table[shot.shot_type.to_sym] = {}
      end

      # create rotation key if necessary
      if !data_table[shot.shot_type.to_sym][shot.rotation.to_sym]
        data_table[shot.shot_type.to_sym][shot.rotation.to_sym] = {}
      end

      # add basic shot type data to appropiate keys
      data_table[shot.shot_type.to_sym][shot.rotation.to_sym].merge!({sum: shot.sum, count: shot.count}) {|key, oldval, newval| oldval + newval}

      data_table[shot.shot_type.to_sym][shot.rotation.to_sym][:percent] = data_table[shot.shot_type.to_sym][shot.rotation.to_sym][:sum] / (data_table[shot.shot_type.to_sym][shot.rotation.to_sym][:count] * 4.0) * 100.00
      
      
      if !data_table[shot.shot_type.to_sym][:combined]
        data_table[shot.shot_type.to_sym][:combined] = {}
      end
      # add combined shots of types to appropiate keys      
      data_table[shot.shot_type.to_sym][:combined].merge!({sum: shot.sum, count: shot.count})  {|key, oldval, newval| oldval + newval}
      data_table[shot.shot_type.to_sym][:combined][:percent] = data_table[shot.shot_type.to_sym][:combined][:sum] / (data_table[shot.shot_type.to_sym][:combined][:count] * 4.0) * 100.00
    
    }

    data_table
  end
end
