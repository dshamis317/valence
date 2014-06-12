class User < ActiveRecord::Base
  authenticates_with_sorcery!
  validates_presence_of :password, on: :create
  validates_presence_of :email, on: :create
  validates_uniqueness_of :email

  has_many :playlists
  has_many :songs, :through => :playlists



end
