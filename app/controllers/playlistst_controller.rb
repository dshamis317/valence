class PlaylistsController < ApplicationController

  def index
    @playlists = User.find(current_user).playlists
  end

  def new
    @user = User.find(params[:user_id])
    @playlist = Playlist.new
  end

  def create
    @playlist = Playlist.new(playlist_params)
    
    if @playlist.save
      current_user.playlists << @playlist
      redirect_to user_playlist_path(current_user, @playlist)
    else 
      render :new
    end


  end

  def show
    @playlist = Playlist.find(params[:id])
  end

  def edit
    @playlist = Playlist.find(params[:id])
  end

  def update
    playlist = Playlist.find(params[:id])    
    playlist.update(playlist_params)
    redirect_to user_playlist_path(current_user, playlist)
  end

  def destroy
    Playlist.delete(params[:id])
    redirect_to uder_playlists_path(current_user)
  end

  private

  def playlist_params
    params.require(:playlist).permit(:title, :mood)
  end

end