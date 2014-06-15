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


# //     search_songs = MusicSearch.find_song(@title)
#     binding.pry
#     @songs = search_songs.each do |song|
#       MusicSearch.get_song(song[:song_id])
#     end
