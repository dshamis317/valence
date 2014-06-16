class User < ActiveRecord::Base
  authenticates_with_sorcery!

  has_many :playlists
  has_many :songs, :through => :playlists

  validates :email, presence: true, confirmation: true, uniqueness: true, email: true
  
  validates :password, presence: true, confirmation: true, length: {within: 6..14, too_short: "is too short, it needs to be between 6 and 14 characters", too_long: "is too long, it needs to be between 6 and 14 characters"} 

end
