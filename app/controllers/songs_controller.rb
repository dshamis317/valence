class SongsController < ApplicationController

  def destroy
    playlist = Playlist.find(params[:id])
    Song.delete(params[:song_id])
    redirect_to user_playlist_path(current_user, playlist)
  end
end
