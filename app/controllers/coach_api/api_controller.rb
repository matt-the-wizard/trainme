module CoachApi
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
        user = User.find_by(auth_token: token)
        if user.present?
          ActiveSupport::SecurityUtils
            .secure_compare(::Digest::SHA256.hexdigest(token),
                            ::Digest::SHA256.hexdigest(user.auth_token))
          return user
        end
      end
    end
  end
end
