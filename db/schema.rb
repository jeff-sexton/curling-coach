# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_12_200824) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ends", force: :cascade do |t|
    t.integer "score_team1"
    t.integer "score_team2"
    t.bigint "game_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "first_team_id"
    t.json "throw_order"
    t.index ["game_id"], name: "index_ends_on_game_id"
  end

  create_table "game_participations", force: :cascade do |t|
    t.bigint "team_id"
    t.bigint "game_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["game_id"], name: "index_game_participations_on_game_id"
    t.index ["team_id"], name: "index_game_participations_on_team_id"
  end

  create_table "games", force: :cascade do |t|
    t.datetime "date_time"
    t.string "location"
    t.boolean "completed"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "players", force: :cascade do |t|
    t.string "name"
    t.integer "throw_order"
    t.bigint "team_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["team_id"], name: "index_players_on_team_id"
  end

  create_table "shots", force: :cascade do |t|
    t.integer "shot_number"
    t.string "rotation"
    t.integer "rating"
    t.string "shot_type"
    t.json "rock_paths"
    t.text "comments"
    t.json "target_position"
    t.integer "sweep_score"
    t.time "hog_time"
    t.bigint "end_id"
    t.bigint "player_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["end_id"], name: "index_shots_on_end_id"
    t.index ["player_id"], name: "index_shots_on_player_id"
  end

  create_table "teams", force: :cascade do |t|
    t.string "team_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
