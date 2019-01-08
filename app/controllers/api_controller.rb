class ApiController < ApplicationController
  before_action :require_login

  def require_login
    authenticate_token || render_unauthorized('Access Denied')
  end

  def current_user
    @current_user ||= authenticate_token
  end

  protected

  def render_unauthorized(message)
    errors = { errors: [detail: message] }
    render json: errors, status: :unauthorized
  end

  private

  def authenticate_token
    authenticate_with_http_token do |token, _options|
      User.find_by(auth_token: token)
    end
  end
end
