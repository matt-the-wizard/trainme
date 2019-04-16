require_relative '../lib/util'

class Client < ApplicationRecord
  validates_presence_of :name
  validates_presence_of :email
  validates_presence_of :phone
  validates :archived, inclusion: { in: [true, false] }

  validates_format_of :email, with: Util::EMAIL_FORMAT

  belongs_to :user

  alias_attribute :coach, :user
end
