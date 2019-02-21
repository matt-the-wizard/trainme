# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_02_20_142339) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "clients", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "phone", null: false
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "archived", default: false, null: false
    t.index ["user_id"], name: "index_clients_on_user_id"
  end

  create_table "fitness_services", force: :cascade do |t|
    t.string "title", null: false
    t.integer "duration", null: false
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_fitness_services_on_user_id"
  end

  create_table "fitness_sessions", force: :cascade do |t|
    t.bigint "client_id"
    t.bigint "user_id"
    t.bigint "fitness_service_id"
    t.time "start_time", null: false
    t.time "end_time", null: false
    t.date "day", null: false
    t.string "location", null: false
    t.string "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["client_id"], name: "index_fitness_sessions_on_client_id"
    t.index ["fitness_service_id"], name: "index_fitness_sessions_on_fitness_service_id"
    t.index ["user_id"], name: "index_fitness_sessions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "name", null: false
    t.string "auth_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "auth_token_created_at"
    t.index ["auth_token", "auth_token_created_at"], name: "index_users_on_auth_token_and_auth_token_created_at"
  end

end
