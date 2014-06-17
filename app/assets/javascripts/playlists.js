//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require jquery.ui.all
//= require songs




// ***** MODEL *****

function PlaylistModel (dataObject) {
   this.title = dataObject.title;
   this.mood = dataObject.mood;
   this.id = dataObject.id;
   this.songs = dataObject.songs;
}


// ***** VIEW *****

function PlaylistView (model) {
   this.model = model;
   this.el = undefined;
}

PlaylistView.prototype.render = function() {
   var playlist = $('<div>').addClass('songs-container');
   for (var i in this.model.songs){
      var songDiv = $('<div>')
         .addClass('playlist-song')
         .html(this.model.songs[i].title);

         $(playlist).append(songDiv);
   }

   this.el = playlist;
   return this;
}

// ***** COLLECTION *****

function PlaylistCollection () {
   this.playlists = [];
}

PlaylistCollection.prototype.fetch = function(callback) {
   var that = this;
   var $userId = $('.playlist').data('userId');
   var $playlistId = $('.playlist').data('playlistId');
   $.ajax({
      url: '/users/'+$userId+'/playlists/'+$playlistId+'/songs',
      method: 'get',
      dataType: 'json',
      success: function(data) {
         var playlist = new PlaylistModel(data);
         that.playlists.push(playlist);
         callback();
      }
   })
}

function displaySongsOnShow () {
  var model = playlistCollection.playlists[0];
  var playlistView = new PlaylistView(model);

  playlistView.render().el.appendTo($('.playlist-songs'));
}

// $(function() {
//   $('.best_in_place').best_in_place();
// });


// $(function() {
//   $( ".open-text-edit" ).show();
// });

$( "button" ).click(function() {
  $( "p" ).show( "slow" );
});

