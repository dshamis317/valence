class SessionsController < ApplicationController

  def new
  end

  def create # login
    user = login(params[:email], params[:password])
    if user
      redirect_to user_playlists_path(user)
    else
      render :new
    end
  end

  def destroy # logout
    logout
    redirect_to root_path
  end

end
