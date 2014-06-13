class Echonest

  def self.api_key
    ENV.fetch("ECHONEST_API_KEY")
  end

  def self.find_song_by_title(title)
    title = title.gsub(" ", "%20").downcase
    query_string = "api_key=#{api_key}&format=json&title=#{title}&sort=song_hotttnesss-desc&results=10"
    data = HTTParty.get("http://developer.echonest.com/api/v4/song/search?#{query_string}")
    songs = data['response']['songs']
    return songs
    ## songs.each will give us the ability to pull individual artist, title and id
  end

  def self.find_song_by_artist(artist)
    artist = artist.gsub(" ", "%20").downcase
    query_string = "api_key=#{api_key}&artist=#{artist}results=20"
    data = HTTParty.get("http://developer.echonest.com/api/v4/song/search?#{query_string}")
    songs = data['response']['songs']
    return songs
    ## songs.each will allow us to list songs by the artist
  end

  def self.find_song_by_song_id(id)
    query_string = "api_key=#{api_key}&format=json&id=#{id}&bucket=audio_summary"
    data = HTTParty.get("http://developer.echonest.com/api/v4/song/profile?#{query_string}")
    song = data['response']['songs'][0]
    song_details = {
      :artist_name => song['artist_name'],
      :title => song['title'],
      :energy => song['audio_summary']['energy'],
      :liveliness => song['audio_summary']['liveliness'],
      :tempo => song['audio_summary']['tempo'],
      :speechiness => song['audio_summary']['speechiness'],
      :acousticness => song['audio_summary']['acousticness'],
      :time_signature => song['audio_summary']['time_signature'],
      :duration => song['audio_summary']['duration'],
      :loudness => song['audio_summary']['loudness'],
      :valence => song['audio_summary']['valence'],
      :danceability => song['audio_summary']['danceability']
    }
    return song_details
  end

end
