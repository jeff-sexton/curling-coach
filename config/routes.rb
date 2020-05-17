Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'

  namespace :api do
    
    resources :games, only: [:index, :show, :create, :update]
    resources :ends, only: [:index, :create, :update]
    resources :shots, except: [:new, :show]
    resources :stats, only: [:show]

  end
end
