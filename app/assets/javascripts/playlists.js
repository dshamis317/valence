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
   var ul = $('<ul>');
   var div = $('<div>')
   .addClass('playlistDisplay')
   .html(this.model.title)
   .append(ul);

   this.el = div;
   return this;
};

// ***** COLLECTION *****

function PlaylistCollection () {
   this.playlists = {};
};

PlaylistCollection.prototype.fetch = function() {
   var that = this;
   var $userId = $('.playlist').data('userId');
   var $playlistId = $('.playlist').data('playlistId');
   $.ajax({
      url: '/users/'+$userId+'/playlists/'+$playlistId+'/songs',
      method: 'get',
      dataType: 'json',
      success: function(data) {
         var playlist = new PlaylistModel(data);
         that.playlists[playlist.id] = playlist;
         console.log(playlist.id);
         }
      
   })
};


PlaylistCollection.prototype.add = function(playlist) {
   var that = this;

   $.ajax({
      url: '/playlists',
      method: 'post',
      dataType: 'json',
      data: {playlist: playlist},
      success: function(data) {
         var playlist = new PlaylistModel(data);
         that.playlists[playlist.id]=playlist;
      }
   })
};
