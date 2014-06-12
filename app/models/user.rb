class User < ActiveRecord::Base
  authenticates_with_sorcery!
  has_many :playlists
  has_many :songs, :through => :playlists
end
