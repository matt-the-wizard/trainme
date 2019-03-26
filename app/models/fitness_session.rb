class FitnessSession < ApplicationRecord
  validates_presence_of :location
  validates_presence_of :start_time_hour
  validates_presence_of :start_time_minutes
  validates_presence_of :start_time_meridiem
  validates_presence_of :end_time_hour
  validates_presence_of :end_time_minutes
  validates_presence_of :end_time_meridiem
  validates_presence_of :day

  belongs_to :user
  belongs_to :client
  belongs_to :fitness_service

  alias_attribute :coach, :user

  def session_start_time
    hour = (start_time_meridiem == 'AM' ? start_time_hour : start_time_hour + 12)
    Time.new(day.year, day.month, day.day, hour, start_time_minutes, 0)
  end

  def session_end_time
    hour = (end_time_meridiem == 'AM' ? end_time_hour : end_time_hour + 12)
    Time.new(day.year, day.month, day.day, hour, end_time_minutes, 0)
  end
end
