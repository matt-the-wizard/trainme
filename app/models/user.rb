class User < ApplicationRecord
  validates :username, presence: true, uniqueness: true
  validates_presence_of :name

  has_secure_password
  has_secure_token :auth_token

  has_many :clients

  def invalidate_token
    update_column(:auth_token, nil)
  end

  def self.validate_login(username, password)
    user = find_by(username: username)
    user&.authenticate(password) ? user : nil
  end
end
