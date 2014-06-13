class PlaylistsController < ApplicationController

  def index
    @playlists = User.find(current_user).playlists
  end

  def new
    @user = current_user
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
    @songs = @playlist.songs
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
    redirect_to user_playlists_path(current_user)
  end

  private

  def playlist_params
    params.require(:playlist).permit(:title, :mood)
  end

end




