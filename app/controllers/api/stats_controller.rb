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


    

  #  testQuery = Shot.connection.select_all(
  #     "
  #     SELECT SUM(shots.rating) AS sum_rating, 
  #     COUNT(shots.rating) AS count_rating, 
  #     (SUM(shots.rating)/(COUNT(shots.rating) * 4.00)*100.00) AS percentage, 
  #     shots.shot_type AS shots_shot_type 
  #     FROM shots 
  #     INNER JOIN ends ON ends.id = shots.end_id 
  #     INNER JOIN games ON games.id = ends.game_id 
  #     INNER JOIN players ON players.id = shots.player_id 
  #     INNER JOIN teams ON teams.id = players.team_id 
  #     WHERE games.id = '3'
  #     AND teams.id = 1 
  #     AND shots.rotation = 'counterclockwise'
  #     GROUP BY shots.shot_type
  #     "
  #   )

  #   puts testQuery.inspect

    # test_shots = Game.includes(ends: :shots).find(4)

    # test_stats = test_shots.ends.map {|this_end| this_end.shots}.flatten

    # ccw_shots = test_shots.ends.references(:shots).where("shots.rotation = 'clockwise'")

    # game_shots = Shot.includes(end: :game, player: :team).references(:games).where("games.id = ?", params[:id])
    # game_shots = Shot.select(:shot_type).includes(end: :game, player: :team).references(:games).where("games.id = ?", params[:id])
    # test_stats = {}
    # test_stats[:count1a] = game_shots.group(:player_id, :rotation, :shot_type).count()
    # test_stats[:count1b] = game_shots.where("shots.rotation = 'counterclockwise' AND player_id = ?", 17).group(:shot_type).count()
    # test_stats[:count2a] = game_shots.where("shots.rotation = 'clockwise' AND player_id = ?", 18).group(:shot_type).count()
    # test_stats[:sum] = game_shots.sum(:rating)

    # test_stats[:combined] = game_shots.select('shot_type, count(rating), sum(rating)').group(:id, "ends.id", "games.id","teams.id", "players.id", :shot_type)
    # test_stats[:combined] = {
    #   count: game_shots.group(:shot_type).count(),
    #   sum: game_shots.group(:shot_type).sum(:rating),
    # }

    # game_shots.each do |shot|
      
    #   test_stats[shot.shot_type]
    # end


        #         count: game_shots.where("teams.id = ?", team.id).group(:shot_type).count(:rating), 
    #         sum: game_shots.where("teams.id = ?", team.id).group(:shot_type).sum(:rating),
    #         all_draws_count: game_shots.where("teams.id = ?", team.id).where(shot_type: ['Draw','Front','Guard','Raise','Wick','Freeze']).count(:rating), 
    #         all_draws_sum: game_shots.where("teams.id = ?", team.id).where(shot_type: ['Draw','Front','Guard','Raise','Wick','Freeze']).sum(:rating), 
    #         all_takeouts_count: game_shots.where("teams.id = ?", team.id).where(shot_type: ['TakeOut','HitAndRoll','Clearing','DoubleTakeOut','PromotionTakeOut']).count(:rating), 
    #         all_takeouts_sum: game_shots.where("teams.id = ?", team.id).where(shot_type: ['TakeOut','HitAndRoll','Clearing','DoubleTakeOut','PromotionTakeOut']).sum(:rating), 
    #         total_count: game_shots.where("teams.id = ?", team.id).count(:rating), 
    #         total_sum: game_shots.where("teams.id = ?", team.id).sum(:rating), 


    # teams = Team.includes(players: [shots: [end: :game]]).references(:games).where("games.id = ?", params[:id])

    # data = teams.map {|team| {team: team, team_stats: get_team_stats(team, team.id), players: team.players}}

    # test_query = Team.joins(players: [shots: [end: :game]]).where("games.id = ?", params[:id]).select('team_id, player_id, rotation, shot_type, sum(rating), count(rating), (sum(rating)/(count(rating)*4.00)*100.00) AS percent').group( :team_id, :player_id, :rotation, :shot_type)
    # test_query = Team.includes(players: [shots: [end: :game]]).where("games.id = ?", params[:id]).select('teams.id, players.id, rotation, shot_type, sum(rating), count(rating), (sum(rating)/(count(rating)*4.00)*100.00) AS percent').group( :team_id, :player_id, :rotation, :shot_type)
    # team1 = test_query.having('team_id = ?', 4)
    # team2 = test_query.having('team_id = ?', 5)
    
    # test_stats = {
      #   team1: team1,
      #   team2: team2
      # }


    # team1_query = test_query.where('team_id = ?', 4)

    # team1_table = get_stats(team1_query)

    # count = 0

    # # test_query.each {|shot|
    # team1_query.each {|shot|
    #   # data[shot[:team_id]][shot[:rotation]][shot[:shot_type]] = {sum: shot[:sum], count: shot[:count], percent: shot[:percent]} 
    #   # puts count
    #   # count = count + 1

    #   # team.players.each {|player|}
    #   if !data[shot.team_id]
    #     data[shot.team_id] = {
    #       team: {id: shot.team_id},
    #       counterclockwise: {
    #         Draw: {},
    #         Front: {},
    #         Guard: {},
    #         Raise: {},
    #         Wick: {},
    #         Freeze: {},
    #         TakeOut: {},
    #         HitAndRoll:{},
    #         Clearing:{},
    #         DoubleTakeOut:{},
    #         PromotionTakeOut:{},
    #         NotScored: {},

    #       },
    #       clockwise: {
    #         Draw: {},
    #         Front: {},
    #         Guard: {},
    #         Raise: {},
    #         Wick: {},
    #         Freeze: {},
    #         TakeOut: {},
    #         HitAndRoll:{},
    #         Clearing:{},
    #         DoubleTakeOut:{},
    #         PromotionTakeOut:{},
    #         NotScored: {},
    #       },
    #       combined: {
    #         Draw: {},
    #         Front: {},
    #         Guard: {},
    #         Raise: {},
    #         Wick: {},
    #         Freeze: {},
    #         TakeOut: {},
    #         HitAndRoll:{},
    #         Clearing:{},
    #         DoubleTakeOut:{},
    #         PromotionTakeOut:{},
    #         NotScored: {},
    #       },
    #     }
    #   end

    #   dataTable = {
    #     Draw: {
    #       clockwise: {},
    #       counterclockwise: {},
    #       combined: {},
    #     },
    #     Front: {},
    #     Guard: {},
    #     Raise: {},
    #     Wick: {},
    #     Freeze: {},
    #     TakeOut: {},
    #     HitAndRoll:{},
    #     Clearing:{},
    #     DoubleTakeOut:{},
    #     PromotionTakeOut:{},
    #     AllDraws: {},
    #     AllTakeOuts: {},
    #     NotScored: {},
    #     Total: {}
    #   }


    #   # puts shot.team_id
    #   # puts shot.rotation.inspect
    #   # puts shot.shot_type

    #   # puts data.inspect
    #   # data[shot.team_id][shot.rotation.to_sym][shot.shot_type.to_sym] = {sum: shot.sum, count: shot.count, percent: shot.percent}

      
    #   # puts data[shot.team_id][shot.rotation].inspect
    #   # puts data[shot.team_id][:combined][:Draw] = 1
      
    #   # data.dig shot.team_id, shot.rotation, shot.shot_type  = 1
      
      
    #   # create shot type keys if necessary
    #   if !dataTable2[shot.shot_type.to_sym] 
    #     dataTable2[shot.shot_type.to_sym] = {}
    #   end

    #   # create rotation key if necessary
    #   if !dataTable2[shot.shot_type.to_sym][shot.rotation.to_sym]
    #     dataTable2[shot.shot_type.to_sym][shot.rotation.to_sym] = {}
    #   end

    #   # add basic shot type data to appropiate keys
    #   dataTable2[shot.shot_type.to_sym][shot.rotation.to_sym].merge!({sum: shot.sum, count: shot.count}) {|key, oldval, newval| oldval + newval}

    #   dataTable2[shot.shot_type.to_sym][shot.rotation.to_sym][:percent] = dataTable2[shot.shot_type.to_sym][shot.rotation.to_sym][:sum] / (dataTable2[shot.shot_type.to_sym][shot.rotation.to_sym][:count] * 4.0) * 100.00
      
      
      
      
    #   if !dataTable2[shot.shot_type.to_sym][:combined]
    #     dataTable2[shot.shot_type.to_sym][:combined] = {}
    #   end
    #   # add combined shots of types to appropiate keys
    #   # puts shot.shot_type.to_sym
    #   # puts dataTable2[shot.shot_type.to_sym][:combined].inspect
      
    #   dataTable2[shot.shot_type.to_sym][:combined].merge!({sum: shot.sum, count: shot.count})  {|key, oldval, newval| oldval + newval}
    #   dataTable2[shot.shot_type.to_sym][:combined][:percent] = dataTable2[shot.shot_type.to_sym][:combined][:sum] / (dataTable2[shot.shot_type.to_sym][:combined][:count] * 4.0) * 100.00

    #   # dataTable2[shot.shot_type.to_sym][:combined][:sum].merge!({sum: shot.sum}) {|key, oldval, newval| oldval + newval}
    #   # dataTable2[shot.shot_type.to_sym][:combined][:count].merge!({count: shot.count}) {|key, oldval, newval| oldval + newval}
      
    #   # if dataTable2[shot.shot_type.to_sym][:combined][:sum]
    #   #   dataTable2[shot.shot_type.to_sym][:combined][:sum] = dataTable2[shot.shot_type.to_sym][:combined][:sum] + shot.sum
    #   # else
    #   #   dataTable2[shot.shot_type.to_sym][:combined][:sum] = shot.sum
    #   # end
    # }

    game_shots = Team.joins(players: [shots: [end: :game]]).where("games.id = ?", params[:id]).select('team_id, player_id, rotation, shot_type, sum(rating), count(rating)').group( :team_id, :player_id, :rotation, :shot_type)
    
    data = {
      team1: get_stats(game_shots.where('team_id = ?', 4)), # use where or pass an id parameter?
      team2: get_stats(game_shots.where('team_id = ?', 5)),
    }
    

    render json: data

  end

  def get_stats (shots)

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
