class ChangeFitnessSessionStartTimeEndTime < ActiveRecord::Migration[5.2]
  def up
    remove_column :fitness_sessions, :start_time
    remove_column :fitness_sessions, :end_time

    add_column :fitness_sessions, :start_time_hour, :integer
    add_column :fitness_sessions, :start_time_minutes, :integer
    add_column :fitness_sessions, :start_time_meridiem, :string
    add_column :fitness_sessions, :end_time_hour, :integer
    add_column :fitness_sessions, :end_time_minutes, :integer
    add_column :fitness_sessions, :end_time_meridiem, :string
  end

  def down
    remove_column :fitness_sessions, :start_time_hour
    remove_column :fitness_sessions, :start_time_minutes
    remove_column :fitness_sessions, :start_time_meridiem
    remove_column :fitness_sessions, :end_time_hour
    remove_column :fitness_sessions, :end_time_minutes
    remove_column :fitness_sessions, :end_time_meridiem

    add_column :fitness_sessions, :start_time, :time
    add_column :fitness_sessions, :end_time, :time
  end
end
