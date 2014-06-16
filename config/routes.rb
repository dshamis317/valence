Rails.application.routes.draw do

  resources :users do
    resources :playlists do
    end
  end

  resources :songs do
  end

  root 'welcome#index'

  get '/login' => 'sessions#new', as: 'login'
  post '/sessions' => 'sessions#create', as: 'sessions'
  delete '/logout' => 'sessions#destroy', as: 'logout'

  get '/signup' => 'users#new', as: 'signup'

  # get '/profile' => 'users#profile', as: 'profile'

  get '/search' => 'playlists#search'

  post 'user/:id/playlists/:playlist_id' => 'playlist#song'

  get '/user/:id/playlists/:id/songs' => 'playlists#songs', as: 'playlist'
end
