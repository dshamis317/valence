Rails.application.routes.draw do

  resources :users do 
    resources :playlists do
    end
  end

  resources :songs do 
  end

  root 'welcome#index'

  get '/login' => 'sessions#new', as: 'log_in'
  post '/sessions' => 'sessions#create', as: 'sessions'
  delete '/logout' => 'sessions#destroy', as: 'log_out'
  
  get '/signup' => 'users#new', as 'signup'

  get '/profile' => 'wizards#profile', as: 'profile'


end
