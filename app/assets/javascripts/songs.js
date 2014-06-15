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
   var ul = $('<ul>');
   var div = $('<div>')
   .addClass('songDisplay')
   .html(this.model.title)
   .append(ul);
   this.el = div;
   return this;
};

// ***** COLLECTION *****

function SongCollection () {
   this.songs = {};
};

SongCollection.prototype.fetch = function() {
   var that = this;
   var $userId = $('.playlist-title').data('userId');
   var songId = that.id
   $.ajax({
      url: '/users/:'+$userId+'/playlists/'+$songId,
      method: 'get',
      dataType: 'json',
      success: function(data) {
         $.each(data, function(i, dataObject) {
            var song = new SongModel(dataObject);
            that.songs[song.id] = song;
         });
      }
   })
};

SongCollection.prototype.add = function(song) {
   var that = this;
   $.ajax({
      url: '/users/:'+$userId+'/playlists/',
      method: 'post',
      dataType: 'json',
      data: {song: song},
      success: function(data) {
         var song = new SongModel(data);
         that.songs[song.id]=song;
      }
   })
};

