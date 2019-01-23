Rails.application.routes.draw do

  namespace :coach_api do
    post '/login' => 'sessions#create'
    delete '/logout' => 'sessions#destroy'

    resources :clients, only: [:index, :show, :create, :update]

    get '/profile' => 'users#profile'
  end

  get '*path', to: "application#index", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
