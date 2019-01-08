Rails.application.routes.draw do
  post '/login' => 'sessions#create'
  delete '/logout' => 'sessions#destroy'

  # resources :users, only: [:create]
  resources :clients, only: [:index, :show, :create]

  get '/profile' => 'users#profile'
end
