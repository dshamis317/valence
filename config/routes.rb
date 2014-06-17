Rails.application.routes.draw do

  resources :users do
    resources :playlists do
    end
  end

  root 'welcome#index'

  get '/login' => 'sessions#new', as: 'login'
  post '/sessions' => 'sessions#create', as: 'sessions'
  delete '/logout' => 'sessions#destroy', as: 'logout'

  get '/signup' => 'users#new', as: 'signup'

  # get '/profile' => 'users#profile', as: 'profile'

  get '/search' => 'playlists#search'

  post '/users/:id/playlists/:playlist_id/new' => 'playlists#song'

  delete '/playlists/:id/songs/:song_id' => 'songs#destroy'

  get '/users/:id/playlists/:playlist_id/thumbnails' => 'playlists#thumbnails'

  get '/users/:id/playlists/:playlist_id/songs' => 'playlists#songs'
end
