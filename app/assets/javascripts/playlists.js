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




// ***** OTHER *****

function displaySongsOnShow () {
  var model = playlistCollection.playlists[0];
  var playlistView = new PlaylistView(model);

  playlistView.render().el.appendTo($('.playlist-songs'));
}


// function updatePlaylistInfo(){
//    var userId = $('.edit-form').data('userID');
//    var playlistId = $('.edit-form').data('playlistId');
//    var newTitle = $('.field').val();
//    var newMood = $('.field').val();
//    // need to update class names in jquery selector
//    // change class of text field in form
//    // create data object for post to db
//    $.ajax({
//       url: '/users/'+$userId+'/playlists/'+$playlistId
//       method: 'put',
//       dataType: 'json',
//       success: function(data) {
//          console.log('something')
//       }
//    })
// }


// constructs an object of all the song attributes of a given playlist's songs
function createPlaylistSongsAttributeArray(playlistCollectionObject){
   
   // gets array of song objects from playlistCollection
   var playlistCollection = playlistCollectionObject;
   var playlist = playlistCollection.playlists[0].songs;

   // creates empty arrays for all song attributes
        var titleArr = [], 
           artistArr = [], 
           energyArr = [], 
         livenessArr = [], 
            tempoArr = [], 
      speechinessArr = [], 
     acousticnessArr = [], 
   time_signatureArr = [], 
         durationArr = [], 
         loudnessArr = [], 
          valenceArr = [], 
     danceabilityArr = [], 
        image_urlArr = [], 
      preview_urlArr = [];

   // goes through song array and pushes each attribute into its corresponding attribute array
   $.each(playlist, function(i, song){
      titleArr.            push(song.title);
      artistArr.           push(song.artist);
      energyArr.           push(song.energy);
      livenessArr.         push(song.liveness);
      tempoArr.            push(song.tempo);
      speechinessArr.      push(song.speechiness);
      acousticnessArr.     push(song.acousticness);
      time_signatureArr.   push(song.time_signature);
      durationArr.         push(song.duration);
      loudnessArr.         push(song.loudness);
      valenceArr.          push(song.valence);
      danceabilityArr.     push(song.danceability);
      image_urlArr.        push(song.image_url);
      preview_urlArr.      push(song.preview_url);
   });

   //creates  songsAttributes object literal
   playlistSongsAttributes = {
            title : titleArr, 
           artist : artistArr, 
           energy : energyArr, 
         liveness : livenessArr, 
            tempo : tempoArr, 
      speechiness : speechinessArr, 
     acousticness : acousticnessArr, 
   time_signature : time_signatureArr, 
         duration : durationArr, 
         loudness : loudnessArr, 
          valence : valenceArr, 
     danceability : danceabilityArr, 
        image_url : image_urlArr, 
      preview_url : preview_urlArr 
   };

   return playlistSongsAttributes;
}