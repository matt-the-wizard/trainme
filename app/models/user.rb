require_relative '../lib/util'

class User < ApplicationRecord
  validates :username, presence: true, uniqueness: true
  validates_presence_of :name
  validates_presence_of :email

  validates_format_of :email, with: Util::EMAIL_FORMAT

  has_secure_password
  has_secure_token :auth_token

  has_many :clients

  def self.validate_login(username, password)
    user = find_by(username: username)
    user&.authenticate(password) ? user : nil
  end

  def self.with_unexpired_token(token, period)
    where(auth_token: token).where('auth_token_created_at >= ?', period).first
  end

  def invalidate_token
    update_column(:auth_token, nil)
  end
end
