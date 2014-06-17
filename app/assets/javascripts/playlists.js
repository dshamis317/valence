// ***** MODEL *****

function PlaylistModel (dataObject) {
   this.title = dataObject.title;
   this.mood = dataObject.mood;
   this.id = dataObject.id;
   this.songs = dataObject.songs;
};


// ***** VIEW *****

function PlaylistView (model) {
   this.model = model;
   this.el = undefined;
};

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
};

// ***** COLLECTION *****

function PlaylistCollection () {
   this.playlists = [];
};

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
         // callback();
      }
   })
};


// PlaylistCollection.prototype.add = function(playlist) {
//    var that = this;

//    $.ajax({
//       url: '/playlists',
//       method: 'post',
//       dataType: 'json',
//       data: {playlist: playlist},
//       success: function(data) {
//          var playlist = new PlaylistModel(data);
//          that.playlists[playlist.id]=playlist;
//       }
//    })
// };
