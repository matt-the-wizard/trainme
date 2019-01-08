class Client < ApplicationRecord
  validates_presence_of :name

  belongs_to :user

  alias_attribute :coach, :user
end
