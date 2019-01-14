Rails.application.routes.draw do

  root "application#index"

  namespace :coach_api do
    post '/login' => 'sessions#create'
    delete '/logout' => 'sessions#destroy'

    resources :clients, only: [:index, :show, :create]

    get '/profile' => 'users#profile'
  end
end
