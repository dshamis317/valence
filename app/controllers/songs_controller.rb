class SongsController < ApplicationController

  def destroy
    playlist = Playlist.find(params[:id])
    Song.delete(params[:song_id])
    render :json => {}
  end
end
