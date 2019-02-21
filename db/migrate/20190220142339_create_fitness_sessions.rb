class CreateFitnessSessions < ActiveRecord::Migration[5.2]
  def change
    create_table :fitness_sessions do |t|
      t.belongs_to :client
      t.belongs_to :user
      t.belongs_to :fitness_service
      t.time :start_time, null: false
      t.time :end_time, null: false
      t.date :day, null: false
      t.string :location, null: false
      t.string :notes

      t.timestamps
    end
  end
end
