Rails.application.routes.draw do

  namespace :coach_api do
    post '/login' => 'sessions#create'
    delete '/logout' => 'sessions#destroy'

    resources :clients, only: [:index, :show, :create, :update] do
      put :archive, on: :member
    end

    resources :services, only: [:index, :show, :create, :update, :destroy]

    get '/profile' => 'users#profile'
  end

  get '*path', to: 'application#index'
end
