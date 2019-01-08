class UsersController < ApiController
  before_action :require_login, except: [:create]

  # def create
  #   user = User.create!(user_params)
  #   render json: { auth_token: user.auth_token }
  # end

  def profile
    user = current_user
    payload = { username: user.username, email: user.email, name: user.name }
    render json: { user: payload }
  end

  private

  def user_params
    params.require(:user).permit(:username,
                                 :password,
                                 :name,
                                 :email)
  end
end
