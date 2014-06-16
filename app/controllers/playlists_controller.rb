class PlaylistsController < ApplicationController

  def index
    @user = current_user
    @playlists = User.find(current_user).playlists
  end

  def search
    @title = params[:name]
    search_songs = MusicSearch.find_song(@title)
    @songs = search_songs.map do |song|
      MusicSearch.get_song(song[:song_id])
    end
    @songs = @songs.flatten
    respond_to do |format|
      format.html
      format.json{render json: @songs.to_json}
    end
  end

  def new
    @user = current_user
    @playlist = Playlist.new
  end

  def create
    @playlist = Playlist.new(playlist_params)

    if @playlist.save
      current_user.playlists << @playlist
      redirect_to user_playlist_path(current_user, @playlist)
    else
      render :new
    end
  end

  # def song
  #   song = Song.find_or_create_by(song_params)
  #   playlist = params[:playlist_id]
  #   if song.save
  #     playlist.songs << song
  #     redirect_to user_playlist_path(current_user, playlist)
  #   end
  # end

  def show
    @playlist = Playlist.find(params[:id])
    @songs = @playlist.songs
  end

  def edit
    @playlist = Playlist.find(params[:id])
  end

  def update
    playlist = Playlist.find(params[:id])
    playlist.update(playlist_params)
    redirect_to user_playlist_path(current_user, playlist)
  end

  def destroy
    Playlist.delete(params[:id])
    redirect_to user_playlists_path(current_user)
  end

  private

  def playlist_params
    params.require(:playlist).permit(:title, :mood)
  end

  # def song_params
  #   params.require(:song).permit(:title,
  #     :artist,
  #     :energy,
  #     :liveness,
  #     :tempo,
  #     :speechiness,
  #     :acousticness,
  #     :time_signature,
  #     :duration,
  #     :loudness,
  #     :valence,
  #     :danceability,
  #     :preview_link,
  #     :image_url
  #     )
  # end

end




