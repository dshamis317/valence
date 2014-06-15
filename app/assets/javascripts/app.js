$(function() {
   var $signUp = $('.signUp');
   $signUp.click(function() {
      var $div = $('<div>');
      $div.addClass('signUpModal').css({'height': '500px', 'width': '500px', 'background-color': 'steelblue'}).html('Sign Up Here');
      $('.container').append($div);
   })
})

function addSongToPlaylist(song){
  var song = new SongModel();
  Playlist.add(song);
}

function setEventHandlers(){
  $(".add-song").droppable({
    drop: function(e, dropped){
      addSongToPlaylist(dropped.draggable);
    },
    hoverClass: "drop-hover"
  });
  $(Playlist).on('change', function(){
    $('.playlist').empty();
    $.each(this.songs, function(i, song){
      var SongView = new SongView(song);
      $('.playlist').prepend(SongView.render().el);
    });
  })
}

$(function(){
  setEventHandlers();
  SongCollection.fetch();
});
