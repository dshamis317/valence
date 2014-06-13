class Itunes < ActiveRecord::Base

  def self.itunes_search(search)
    search = search.downcase.gsub(" ", "+")
    query_string = "entity=musicTrack&limit=20&term=#{search}"
    url = "http://itunes.apple.com/search?#{query_string}"
    raw_response = HTTParty.get(url)
    response = JSON.parse(raw_response)
    raw_song = response['results']
    package_songs = raw_song.map do |song|
      {
        :artist => song['artistName'],
        :title => song['trackName'],
        :song_id => song['trackId'],
        :artwork_url => song['artworkUrl100']
      }
    end
    return package_songs
  end

  def self.itunes_lookup(id)
    url = "http://itunes.apple.com/lookup?id=#{id}"
    raw_response = HTTParty.get(url)
    response = JSON.parse(raw_response)
    raw_song = response['results'].first
    song_hash = {
      title: raw_song['trackName'],
      album: raw_song['collectionName'],
      genre: raw_song['primaryGenreName'],
      preview_link: raw_song['previewUrl'],
      artwork_url: raw_song['artworkUrl100']
    }
    Song.new(song_hash)
  end

end
