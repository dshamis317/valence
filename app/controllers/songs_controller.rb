class SongsController < ApplicationController

  def index
  end

  def new
  end

  def create
  end

  def show
  end

  def edit
  end

  def update
  end

  def destroy
    Song.delete(params[:id])
    redirect_to user_playlists_path(current_user)
  end


end
