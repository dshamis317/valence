// ***** MODEL *****

function SongModel (dataObject) {
  this.title = dataObject ? dataObject.title : undefined;
  this.id = dataObject ? dataObject.id : undefined;
  this.artist = dataObject ? dataObject.artist : undefined;
  this.energy = dataObject ? dataObject.energy : undefined;
  this.liveness = dataObject ? dataObject.liveness : undefined;
  this.tempo = dataObject ? dataObject.tempo : undefined;
  this.speechiness = dataObject ? dataObject.speechiness : undefined;
  this.acousticness = dataObject ? dataObject.acousticness : undefined;
  this.time_signature = dataObject ? dataObject.time_signature : undefined;
  this.duration = dataObject ? dataObject.duration : undefined;
  this.loudness = dataObject ? dataObject.loudness : undefined;
  this.valence = dataObject ? dataObject.valence : undefined;
  this.danceability = dataObject ? dataObject.danceability : undefined;
  this.image_url = dataObject ? dataObject.image_url : undefined;
  this.preview_url = dataObject ? dataObject.preview_url : undefined;
};

// ***** VIEW *****

function SongView (model) {
 this.model = model;
 this.el = undefined;
};

SongView.prototype.render = function() {
 var $div = $('<div>').addClass('playlist-song-display')
 var $img = $('<img>').addClass('playlist-index-artwork').attr('src', this.model.image_url)
 $div.append($img)
 this.el = $div;
 return this;
};

// ***** COLLECTION *****

function SongCollection () {
 this.songs = [];
 this.searchResults = [];
};

SongCollection.prototype.fetchToPlaylistIndex = function() {
 var that = this;
 var $userId = $('.playlist-index').data('userId');
 var $playlistIDArray = $('.playlist-index')
 $.each($playlistIDArray, function(i, element) {
  var $playlistId = $(element).data('playlistId');
  $.ajax({
    url: '/users/'+$userId+'/playlists/'+$playlistId+'/songs',
    method: 'get',
    dataType: 'json',
    success: function(data) {
     $.each(data, function(i, dataObject) {
      var song = new SongModel(dataObject);
      that.songs[song.id] = song;
    });
     $(that).trigger('change');
   }
 });
})
};

SongCollection.prototype.addToDB = function(song) {
 var that = this;
 var $userId = $('.playlist-index').data('userId');
 var $playlistId = $('.playlist-index').data('playlistId');
 $.ajax({
  url: '/users/'+$userId+'/playlists/'+$playlistId,
  method: 'post',
  dataType: 'json',
  data: {song: song},
  success: function(data) {
   console.log(song);
 }
})
};

SongCollection.prototype.search = function(query) {
  var that = this;
  $.ajax({
    url: '/search',
    method: 'get',
    data: {name: query},
    dataType: 'json',
    success: function(data) {
      $.each(data, function(i, datum){
        that.searchResults.push(datum)
        songCollection.displayResults(i, datum);
        console.log(datum)
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
  // var $songData = $('<data>').attr('index', i)
  $songResult.append($songImage, $songTitle, $songArtist)
  .draggable({revert: 'invalid'})
  $searchResults.append($songResult)
}
