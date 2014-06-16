class WelcomeController < ApplicationController

  def index
    @user = User.new
  end

  def search
    @title = params[:name]
    search_songs = MusicSearch.find_song(@title)
    @songs = search_songs.map do |song|
      MusicSearch.get_song(song[:song_id])
    end
    @songs = @songs.flatten
  end


end



