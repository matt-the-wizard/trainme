module CoachApi
  class SessionsController < ApiController
    skip_before_action :require_login, only: [:create], raise: false

    def create
      user = User.validate_login(params[:username], params[:password])
      if user.present?
        user.regenerate_auth_token
        user.update_column(:auth_token_created_at, Time.now)
        render json: { token: user.auth_token }
      else
        render_unauthorized('Error with your login or password')
      end
    end

    def destroy
      current_user.invalidate_token
      head :ok
    end
  end
end