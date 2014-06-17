var playlistCollection = new PlaylistCollection();
var songCollection = new SongCollection();


function setDroppableHandlers() {
  $('.playlist-index').droppable({
    drop: function(e, dropped) {
      var index = dropped.draggable.data('index');
      shrinkArtwork(dropped.draggable);
      addSongToDatabase(index);
    }
  })
}

function shrinkArtwork(el) {
  el.toggle('scale');
}

function addSongToDatabase(index) {
  var resultsArray = songCollection.searchResults;
  songCollection.addToDB(resultsArray[index]);
}

function renderMiniArtworkWithinPlaylist() {
  var songModel = new SongModel();
  var songView = new SongView(songModel);
  songView.render().el.hide().appendTo($('.playlist-songs-index')).fadeIn(1000)
}

function displaySongsOnShow () {
  var model = playlistCollection.playlists[0];
  var playlistView = new PlaylistView(model);

  playlistView.render().el.appendTo($('.playlist-songs'));
}

$(document).on('ready page:change', function() {

  $('.song-search').submit(function(e) {
    $('.search-results').html('');
    e.preventDefault();
    var query = $('.song-text-field').val();
    songCollection.search(query);
  })


  playlistCollection.fetch();
  displaySongsOnShow();
  // displaySongsOnShow();
  setDroppableHandlers();
  // songCollection.fetchToPlaylistIndex();
  // renderMiniArtworkWithinPlaylist();
})
