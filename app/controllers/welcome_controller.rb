class WelcomeController < ApplicationController

  def index
    @user = User.new
  end

  def search
    @songs = MusicSearch.find_song(params[:name])
  end

  def song
    @song = MusicSearch.get_song(params[:id])
  end
end
