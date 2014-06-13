class User < ActiveRecord::Base
  authenticates_with_sorcery!

  # validates_presence_of :password, on: :create
  # validates_presence_of :email, on: :create
  # validates_uniqueness_of :email

  has_many :playlists
  has_many :songs, :through => :playlists

  validates :email, presence: true, confirmation: true, uniqueness: true#, email: true
  
  validates :password, presence: true, confirmation: true, length: {within: 8..14, too_short: "is too short, it needs to be between 8 and 14 characters", too_long: "is too long, it needs to be between 8 and 14 characters"}
  # where is password length set? why isn't it checking 

end
