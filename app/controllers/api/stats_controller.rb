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

    game_shots = Shot.includes(end: :game, player: :team).references(:games).where("games.id = ?", params[:id])
    test_stats = {}
    test_stats[:count] = game_shots.group(:shot_type).count()
    test_stats[:sum] = game_shots.sum(:rating)





    render json: test_stats


  end

  def make_stats (where)


  end
end
