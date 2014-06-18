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

PlaylistView.prototype.attachHoverEvent = function attachHoverEvent(img, song) {
      img.hover(function() {
         song.play();
      }, function(){
         song.pause();
      });
};

PlaylistView.prototype.render = function() {
   var playlist = $('.playlist-songs');
   for (var i in this.model.songs){
      var songDiv = $('<div>').
      addClass('playlist-song').
      html(this.model.songs[i].title+", "+this.model.songs[i].artist).
      data('songId', this.model.songs[i].id).
      data('playlistId', $('.playlist-title').data('playlistId'));

      var imgDiv = $('<img>')
      .addClass('song-show-image')
      .attr('src', this.model.songs[i].image_url);

      var previewHover = $('<audio>')
      .addClass('preview-song')
      .attr('src', this.model.songs[i].preview_url);
      var deleteButton = $('<button>')
      .addClass('fa fa-trash-o')

      $(deleteButton).on('click', function(e) {
         var that = this;
         var songId = $(e.target.parentElement).data('songId')
         var playlistId = $(e.target.parentElement).data('playlistId')
         $.ajax({
            url: '/playlists/'+playlistId+'/songs/'+songId,
            type: 'post',
            dataType: 'json',
            data: {"_method":"delete"},
            success: function() {
               console.log(that.parentElement)
               $(that.parentElement).remove();
            }
         })
      });

      this.attachHoverEvent(imgDiv, previewHover[0]);

      $(songDiv).append(imgDiv, deleteButton, previewHover)
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
   var $userId = $('.playlist-title').data('userId');
   var $playlistId = $('.playlist-title').data('playlistId');
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

