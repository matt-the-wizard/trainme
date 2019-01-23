require_relative '../lib/util'

class Client < ApplicationRecord
  validates_presence_of :name
  validates_presence_of :email
  validates_presence_of :phone
  validates_presence_of :archived

  validates_format_of :email, with: Util::EMAIL_FORMAT
  validates_format_of :phone, with: Util::PHONE_FORMAT

  belongs_to :user

  alias_attribute :coach, :user
end
