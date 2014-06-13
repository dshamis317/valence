# App Name: Valence


## Research/Concept

Valence is a way for people to discover new music, make playlist of their favorite songs and see their music in a new way. We all love our music but we don't have a good way of understaing what makes up a song: what makes it unique and what makes it appeal to us.

Valence is an interactive tool that allows anyone to visualize their music and see the story of their own musical taste.


## Data Model:

| User             |
| ---------------- |
| email            |
| crypted_password |
| salt             |
| username         |

| Songs           |
| ----------------|
| title           |
| artist          |
| energy          |
| liveness        |
| tempo           |
| speechiness     |
| acousticness    |
| time_signature  |
| duration        |
| loudness        |
| valence         |
| danceability    |
| preview         |
| url             |

| Playlist        |
| --------------- |
| title           |
| mood            |
| user_id         |

| playlists_songs |
| --------------- |
| playlist_id     |
| song_id         |


##Sitemap



##Wireframes



#### Resources/Gems:

EchoNest API: http://developer.echonest.com/
iTunes API: https://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html


##Heroku:

http://valence.herokuapp.com/


##Trello:

https://trello.com/b/RMuqoudp/valence


##Questions and Ideas

- single page CRUD functionality for song search and playlists creation
- modal window?
- comparing search results from two API sources – specifically iTunes and EchoNest
- how to do form partial with Sorcery

##Visualization Radicalness Ideas
- vibrating blocks/playlist sculpture



##Things To Address or Implement or Just Talk About a Bit More
- D3
- iTunes API

##To Do Tomorrow
- finish navigation between user pages
- current_user can only edit their own page
- email and password confirmation field
- validations??
- ajax?







