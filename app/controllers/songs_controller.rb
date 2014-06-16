class SongsController < ApplicationController

  def destroy
    Song.delete(params[:id])
    redirect_to user_playlists_path(current_user)
  end


end
