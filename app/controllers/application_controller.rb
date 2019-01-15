class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods

  def index
    render :file => 'public/index.html'
  end
end
