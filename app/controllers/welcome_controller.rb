class WelcomeController < ApplicationController

  def index
    @user = User.new
  end

  def search
    @title = params[:name]
    @songs = MusicSearch.find_song(@title)
  end

  def song
    @song = MusicSearch.get_song(params[:id])
  end
end
