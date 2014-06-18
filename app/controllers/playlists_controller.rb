class PlaylistsController < ApplicationController
  respond_to :html, :json
  def index
    @user = current_user
    @playlists = User.find(current_user).playlists
  end

  def songs
    playlist = Playlist.find(params[:playlist_id])

    @playlistContentHash = {title: playlist.title, mood: playlist.mood, id: playlist.id, songs: playlist.songs}

    respond_to do |format|
      # format.html
      format.json { render json: @playlistContentHash.to_json}
    end
  end

  def thumbnails
    user = User.find(params[:id])
    playlist = Playlist.find(params[:playlist_id])
    @songs = playlist.songs
    respond_to do |format|
      format.html
      format.json{render json: @songs.to_json}
    end
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
      redirect_to user_playlists_path(current_user)
    else
      render :new
    end
  end

  def song
    song = Song.new(song_params)
    render :json => song.to_json
    playlist = Playlist.find(params[:playlist_id])
    playlist.songs << song
  end

  def show
    @playlist = Playlist.find(params[:id])
    @songs = @playlist.songs


  end

  def edit
    @playlist = Playlist.find(params[:id])
  end

  def update
    @playlist = Playlist.find(params[:id])
    @playlist.update(playlist_params)
    redirect_to user_playlist_path(current_user, @playlist)
  end

  def destroy
    Playlist.delete(params[:id])
    redirect_to user_playlists_path(current_user)
  end

  private

  def playlist_params
    params.require(:playlist).permit(:title, :mood)
  end

  def song_params
    params.require(:song).permit(:title,
      :artist,
      :energy,
      :liveness,
      :tempo,
      :speechiness,
      :acousticness,
      :time_signature,
      :duration,
      :loudness,
      :valence,
      :danceability,
      :preview_url,
      :image_url
      )
  end

end




