# App Name: Valence

 
## Summary

Valence is a way for people to discover new music, make playlist of their favorite songs and see their music in a new way. We all love our music but we don't have a good way of understaing what makes up a song: what makes it unique and what makes it appeal to us.

Valence is an interactive tool that allows anyone to visualize their music and see the story of their own musical taste.

## Research/Concept

Valence emerged from the dual desires to work with music APIs and to lear D3. The app we created is a fully functioning CRUD app that utilizes both Rails and AJAX functionality to work with the backend database. The site exists on only three pages with much of the functionality operating without any page reloads. Significant effort was put into creating a seamless and enjoyable user experience by utilizing different type of javascript and jquery functions.



The centerpiece of the app is the visualization mechanism that allows users to visualize their playlists in a number of ways. The EchoNest API provides us with a range of interesting data about countless songs in their library. The visualizers display data like tempo and energy but also less typical information like the valence, speechiness, and acousticness of a given song. The design of the visualizer structure allows for the easy development and inclusion of new visualization functions in the future.


## Data Model:

| User             |
| ---------------- |
| email            |
| password         |

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
| image_url       |

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

![Alt text](/lib/planning-art/valence-sitemap.JPG)


##Wireframes

![Alt text](/lib/planning-art/valence-wireframes.JPG)


#### Resources/Gems:

#####APIs
EchoNest API: http://developer.echonest.com/  
iTunes API: https://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html

#####Gems
HTTParty Gem: https://github.com/jnunemaker/httparty
d3-rails Gem: https://github.com/iblue/d3-rails
Font Awesome Gem: http://fortawesome.github.io/Font-Awesome/

#####Database
Postrgresql



##Heroku:

http://valence.herokuapp.com/


##Trello:

https://trello.com/b/RMuqoudp/valence


###Thanks and let us know if you have any feedback!




