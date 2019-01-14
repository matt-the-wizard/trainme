module CoachApi
  class UsersController < ApiController
    before_action :require_login, except: [:create]

    def profile
      user = current_user
      payload = { username: user.username, email: user.email, name: user.name }
      render json: { user: payload }
    end
  end
end
