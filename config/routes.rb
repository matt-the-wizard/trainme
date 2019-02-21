Rails.application.routes.draw do
  namespace :coach_api do
    get 'fitness_sessions/index'
  end
  namespace :coach_api do
    post '/login' => 'sessions#create'
    delete '/logout' => 'sessions#destroy'

    resources :clients, only: [:index, :show, :create, :update] do
      put :archive, on: :member
    end

    resources :fitness_services, only: [:index]
    # resources :fitness_services, only: [:index, :show, :create, :update] do
    #   #  put :archive, on: :member
    # end

    resources :fitness_sessions, only: [:index, :create]

    get '/profile' => 'users#profile'
  end

  get '*path', to: 'application#index'
end
