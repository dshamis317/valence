# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


user = User.create(email: "bilbert@example.com", password: "password", username: "username")


britney = Song.create(title: "Hit Me Baby One More Time", artist: "Britney, bitch")
smith = Song.create(title: "I Don't Wanna Miss A Thing", artist: "Aerosmith")
stones = Song.create(title: "Time Is On My Side", artist: "The Rolling Stones")

party = Playlist.create(title: "Party Mix", mood: "happy", user_id: 2)

party.songs << britney
party.songs << smith
party.songs << stones

user.playlists << party
