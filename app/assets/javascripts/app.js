var songCollection = new SongCollection();


function setDroppableHandlers() {
  $('.playlist-index').droppable({
    drop: function(e, dropped) {
      shrinkArtwork(dropped.draggable)
      console.log('BOOM')
    }
  })
}



function shrinkArtwork(el) {
  el.toggle('scale')
}



$(function() {

  $('.song-search').submit(function(e) {
    e.preventDefault();
    var query = $('.song-text-field').val();
    songCollection.search(query);
  })

  setDroppableHandlers()

})
