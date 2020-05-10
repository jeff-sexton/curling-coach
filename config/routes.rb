Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'

  namespace :api do
    
    resources :games, only: [:index, :create, :update]
    resources :ends, only: [:index, :update]
    resources :shots, except: [:new, :show, :update]

  end
end
