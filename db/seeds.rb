# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# 
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

puts "Seeding Data ..."

# Helper functions - DO NOT NEED AT THE MOMENT
# def open_asset(file_name)
#   File.open(Rails.root.join('db', 'seed_assets', file_name))
# end

# Only run on development (local) instances not on production, etc.
unless Rails.env.development?
  puts "Development seeds only (for now)!"
  exit 0
end

# Let's do this ...

## GAMES

puts "Finding or Creating Games ..."

game1 = Game.find_or_create_by!({
  id: 1, 
  date_time: 3.days.ago,
  location: 'Vancouver',
  completed: false
})
game2 = Game.find_or_create_by!({
  id: 2, 
  date_time: '2020-05-06T02:00:00.000Z',
  location: 'North Shore',
  completed: false
})


## ENDS

puts "Re-Creating Ends ..."

End.destroy_all

10.times do 
  game1.ends.create!
end

## TEAMS

puts "Finding or Creating Teams ..."

team1 = Team.find_or_create_by! team_name: "Jeff's Team"
team2 = Team.find_or_create_by! team_name: "Yasu's Team"
team3 = Team.find_or_create_by! team_name: "Alan's Team"

## PLAYERS

puts "Re-creating Players ..."

Player.destroy_all

team1.players.create!({
  name:  'Vlad',
  throw_order: 1
})

team1.players.create!({
  name:  'Jas',
 throw_order: 2
})

team1.players.create!({
  name:  'Dexter',
 throw_order: 3
})

team1.players.create!({
  name:  'Allen',
 throw_order: 4
})

team2.players.create!({
  name:  'Santiago',
  throw_order: 1
})

team2.players.create!({
  name:  'Aidan',
 throw_order: 2
})

team2.players.create!({
  name:  'Jason',
 throw_order: 3
})

team2.players.create!({
  name:  'Brad',
 throw_order: 4
})

## GAME PARTICIPATIONS

puts "Re-Creating Game Participations ..."

GameParticipation.destroy_all

game1.game_participations.create!({
  team_id: 1
})

game1.game_participations.create!({
  team_id: 2
})

game2.game_participations.create!({
  team_id: 1
})

game2.game_participations.create!({
  team_id: 3
})

puts "DONE!"