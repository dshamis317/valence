//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require jquery.ui.all

// ***** MODEL *****

function SongModel (dataObject) {
   this.title = dataObject.title;
   this.id = dataObject.id;
   this.artist = dataObject.artist;
   this.energy = dataObject.energy;
   this.liveness = dataObject.liveness;
   this.tempo = dataObject.tempo;
   this.speechiness = dataObject.speechiness;
   this.acousticness = dataObject.acousticness;
   this.time_signature = dataObject.time_signature;
   this.duration = dataObject.duration;
   this.loudness = dataObject.loudness;
   this.valence = dataObject.valence;
   this.danceability = dataObject.danceability;
   this.image_url = dataObject.image_url;
   this.preview_url = dataObject.preview_url;
};

// ***** VIEW *****

function SongView (model) {
   this.model = model;
   this.el = undefined;
};

SongView.prototype.render = function() {
   var $img = $('<img>').addClass('playlist-index-artwork').attr('src', this.model.image_url)
   $div.append($img)
   var $div = $('<div>').addClass('playlist-song-display')
   this.el = $div;
   return this;
};

// ***** COLLECTION *****

function SongCollection () {
   this.songs = [];
   this.searchResults = [];
}


SongCollection.prototype.addToDB = function(playlistID, song) {
  var that = this;
  var $userId = $('.playlist-index').data('userId');
  var $playlistId = playlistID;
  $.ajax({
    url: '/users/'+$userId+'/playlists/'+$playlistId+'/new',
    method: 'post',
    dataType: 'json',
    data: {song: song},
    success: function(data) {
     console.log(song);
  }
})

}

SongCollection.prototype.search = function(query) {
   var that = this;
   that.searchResults = [];
   $('.search-results').html('');
   $.ajax({
      url: '/search',
      method: 'get',
      data: {name: query},
      dataType: 'json',
      success: function(data) {
         $.each(data, function(i, datum){
            that.searchResults.push(datum);
            songCollection.displayResults(i, datum);
               console.log(datum);
            })
         $('.song-text-field').val('');
      }
   })
}

SongCollection.prototype.displayResults = function(i, songObject) {

  var $searchResults = $('.search-results');
  var $songResult = $('<div>').addClass('song-object');
  $songResult.data('index', i);
  var $songImage = $('<img>').attr('src', songObject.image_url);
  var $songTitle = $('<p>').html(songObject.title);
  var $songArtist = $('<p>').html(songObject.artist);
  var $songData = $('<data>').attr('index', i)
  $songResult.append($songImage, $songTitle, $songArtist)
  .draggable({revert: 'invalid'})
  $searchResults.append($songResult)
}

