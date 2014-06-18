//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require d3
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
         visualizePlaylist(playlistSongsAttributes);

      }
   })
}




// ***** OTHER *****

function displaySongsOnShow () {
  var model = playlistCollection.playlists[0];
  var playlistView = new PlaylistView(model);
  createPlaylistSongsAttrArr(model);
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
function createPlaylistSongsAttrArr(playlistCollectionObject){

   // gets array of song objects from playlistCollection
   var playlistCollection = playlistCollectionObject;
   var playlist = playlistCollection.songs;

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

var d3Margin = {top: 10, right: 10, bottom: 10, left: 10};

var windowHeight = $(window).height();

var d3Var = {
      width: 650 - d3Margin.left - d3Margin.right,
      height: (windowHeight * 0.9) - d3Margin.top - d3Margin.bottom,
      padding: 5,
};


function visualizePlaylist(playlistSongsAttributes) {

   // these are the data arrays used in the visualization
   var energy = playlistSongsAttributes.energy;
   var danceability = playlistSongsAttributes.danceability;



   // height for song objects in relation to canvas height and number of objects in array
   var songHeight = (d3Var.height/energy.length - d3Var.padding);

// sets the y attribute in relation to the number of data elements entered and the height of the canvas
   var y = d3.scale.ordinal()
        .domain(d3.range(energy.length))
        .rangePoints ([0, (d3Var.height-songHeight)]);


   // creates an automatic color spectrum
   var z = d3.scale.linear()
        .domain([10,0])
        .range(["hsl(300, 100%, 46%)","hsl(74, 100%, 93%)" ])
        .interpolate(d3.interpolateHcl);

   var canvas = d3.select('.canvas')
           .attr("width", d3Var.width + d3Margin.left + d3Margin.right)
           .attr("height", d3Var.height + d3Margin.top + d3Margin.bottom)
           .append('g')
           .attr("transform", "translate(" + d3Margin.left + "," + d3Margin.top + ")");


   // creates songObjects as "g"s in "canvas" svg corresponding to the number of elements in data array, adds height and width and sets up a call back to slide function
   canvas.selectAll('rect')
      .data(energy)
      .enter().append('rect')
         .attr('width', d3Var.width*0.8)
         .attr('height', songHeight)
         .attr('x', d3Var.width/2 - 25)
         .attr('y', function(d, i){ return y(i)})
         .attr('rx', '2')
         .attr('ry', '2')
         .style('stroke-width', '2')
         .style('stroke', 'darkgrey')
      .transition()
         .duration(function(d) { return 1100 - (1000*d) })
         .each(function() {slide(danceability, z)});

}

// creates the lateral movement of the object according to dataArray
function slide (danceability, z) {
   var rectangle = d3.selectAll('rect');
   (function repeat() {
     rectangle = rectangle.transition()
         .attr('x', d3Var.width - d3Var.width*0.8 )
         .ease('linear')
      .transition()
         .attr('x', 0)
         .ease('linear')
         .each('end', repeat);
   }) ();

// sets color according to danceArray
d3.select('.canvas').selectAll('rect')
   .data(danceability)
   .style('fill', function(d) { return z(d * 10 ); });
}




