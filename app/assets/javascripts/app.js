var songCollection = new SongCollection();

$(function() {

  $('.song-search').submit(function(e) {
    e.preventDefault();
    var query = $('.song-text-field').val();
    songCollection.search(query);
  })
})

