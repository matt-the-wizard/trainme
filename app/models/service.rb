class Service < ApplicationRecord
  validates_presence_of :title
  validates_presence_of :duration

  belongs_to :user

  alias_attribute :coach, :user
end
