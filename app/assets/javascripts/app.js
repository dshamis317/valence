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

$(function() {

  $(".sortable").sortable();
  $(".sortable").disableSelection();

  $('.song-search').submit(function(e) {
    $('.search-results').html('');
    e.preventDefault();
    var query = $('.song-text-field').val();
    songCollection.search(query);
  });

  setDroppableHandlers();

});
