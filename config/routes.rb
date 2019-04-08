Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

  namespace :coach_api do
    get 'fitness_sessions/index'
  end
  namespace :coach_api do
    post '/login' => 'sessions#create'
    delete '/logout' => 'sessions#destroy'

    resources :clients, only: [:index, :show, :create, :update] do
      put :archive, on: :member
    end

    resources :fitness_services, only: [:index, :create, :update]  do
      put :archive, on: :member
    end

    resources :fitness_sessions, only: [:index, :create, :update, :destroy]

    get '/profile' => 'users#profile'
  end

  get '*path', to: 'application#index'
end
