class FitnessSession < ApplicationRecord
  validates_presence_of :location
  validates_presence_of :start_time
  validates_presence_of :end_time
  validates_presence_of :day

  belongs_to :user
  belongs_to :client
  belongs_to :fitness_service

  alias_attribute :coach, :user
end
