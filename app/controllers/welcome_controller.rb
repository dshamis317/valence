class WelcomeController < ApplicationController

  def index
  end

  def search
    @songs = MusicSearch.find_song(params[:name])
  end

  def song
    @song = MusicSearch.get_song(params[:id])
  end
end
