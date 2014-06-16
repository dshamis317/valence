class MusicSearch

  def self.find_song(query)
    itunes_results = Itunes.itunes_search(query)
    return itunes_results
  end

  def self.get_song(id)
    ## id will be passed through params
    song_itunes = Itunes.itunes_lookup(id)
    title = song_itunes[:title]
    artist = song_itunes[:artist]
    song_echo = Echonest.find_song_by_title(title)
    en_id = []
    song_echo.each do |song|
      if song['artist_name'].gsub(/[^a-zA-Z0-9]+/, "").downcase == artist.gsub(/[^a-zA-Z0-9]+/, "").downcase && song['title'].gsub(/[^a-zA-Z0-9]+/, "").downcase == title.gsub(/[^a-zA-Z0-9]+/, "").downcase
        en_id << song['id']
      end
    end
    echo_details = Echonest.find_song_by_song_id(en_id[0])
    song = {
      :title => title,
      :artist => artist,
      :energy => echo_details[:energy],
      :liveness => echo_details[:liveness],
      :tempo => echo_details[:tempo],
      :speechiness => echo_details[:speechiness],
      :acousticness => echo_details[:acousticness],
      :time_signature => echo_details[:time_signature],
      :duration => echo_details[:duration],
      :loudness => echo_details[:loudness],
      :valence => echo_details[:valence],
      :danceability => echo_details[:danceability],
      :preview_link => song_itunes[:preview_link],
      :image_url => song_itunes[:artwork_url]
    }
    return song
  end
end
