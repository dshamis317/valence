// ***** VISUALIZATION *****


var svgMargin     = {top: 40, right: 40, bottom: 40, left: 40};

var windowHeight  = $(window).height();

var svgWindow     = {
                  width: 650 - svgMargin.left - svgMargin.right,
                  height: (windowHeight * 0.9) - svgMargin.top - svgMargin.bottom,
                  padding: 5
                  };


function makeCanvas(){
  var canvas = d3.select('.canvas')
      .attr("width", svgWindow.width + svgMargin.left + svgMargin.right)
      .attr("height", svgWindow.height + svgMargin.top + svgMargin.bottom)
      .append('g')
      .attr("transform", "translate(" + svgMargin.left + "," + svgMargin.top + ")");

  return canvas;
}

function getCanvas(){
  var canvas = d3.select('.canvas');
  return canvas;
}


// constructs an object of all the song attributes of a given playlist's songs
function songsAttrArr(playlistCollectionObject){

   var playlist = playlistCollectionObject.songs;


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

} // end of songsAttrArr




// ***** VISUALIZATION FUNCTIONS *****

function coloredBars(playlistSongsAttributes){

  var energy = playlistSongsAttributes.energy;
  var danceability = playlistSongsAttributes.danceability;

  // height for song objects in relation to canvas height and number of objects in array
  var padding = 5;
  var songHeight = (svgWindow.height/energy.length - padding);

  // sets the y attribute in relation to the number of data elements entered and the height of the canvas
  var y = d3.scale.ordinal()
      .domain(d3.range(energy.length))
      .rangePoints ([0, (svgWindow.height-songHeight)]);

  // creates songObjects as "g"s in "canvas" svg corresponding to the number of elements in data array, adds height and width and sets up a call back to slide function
  makeCanvas().selectAll('rect')
    .data(energy)
    .enter().append('rect')
      .attr('width', svgWindow.width*0.8)
      .attr('height', songHeight)
      .attr('x', svgWindow.width/2 - 25)
      .attr('y', function(d, i){ return y(i)})
      .attr('rx', '2')
      .attr('ry', '2')
      .style('stroke-width', '2')
      .style('stroke', 'darkgrey')
    .transition()
      .duration(function(d) { return 1100 - (1000*d) })
      .each(function(){
        slide(danceability);
      });

} // end of coloredBars


function slide(danceability){

  var rectangle = d3.selectAll('rect');

  // creates color spectrum
  var z = d3.scale.linear()
      .domain([10,0])
      .range(["hsl(300, 100%, 46%)","hsl(74, 100%, 93%)" ])
      .interpolate(d3.interpolateHcl);

  // creates the lateral movement of the object according to energy array
  (function repeat() {
    rectangle = rectangle.transition()
      .attr('x', svgWindow.width - svgWindow.width*0.8 )
      .ease('linear')
    .transition()
      .attr('x', 0)
      .ease('linear')
      .each('end', repeat);
  }) ();

  // sets color according to danceability array
  getCanvas().selectAll('rect')
    .data(danceability)
    .style('fill', function(d) { return z(d * 10); });

} // end of slide

function pulsingCircles(playlistSongsAttributes){

  var tempo = playlistSongsAttributes.tempo;

  // vertical padding for songObject
  var padding = 10;

  // height for song objects in relation to canvas height and number of objects in array
  var songRadius = (svgWindow.height/tempo.length - padding)/2;

  // sets the y attribute in relation to the number of data elements entered and the height of the canvas
  var y = d3.scale.ordinal()
    .domain(d3.range(tempo.length))
    .rangePoints ([0, (svgWindow.height-(songRadius*2))]);

  // creates songObjects as "g"s in "canvas" svg corresponding to the number of elements in data array, adds radius and x,y and sets up a call back to pulse function
  makeCanvas().selectAll('circle')
    .data(tempo)
      .enter().append('circle')
      .attr('r', songRadius)
      .attr('cx', svgWindow.width/2 - 25) //
      .attr('cy', function(d, i){ return y(i)})
      .style('stroke-width', '2')
      .style('stroke', 'darkgrey')
      .style('fill', 'chartreuse')
    .transition()
      .duration(function(d) { return ((60/d)*1000)/2 })
      .each(function(){
        pulse(songRadius);
      });

}

function pulse(songRadius){
  var circle = d3.selectAll('circle');

  (function repeat() {
    circle = circle.transition()
      .attr('r', songRadius)
      .ease('linear')
    .transition()
      .attr('r', songRadius*3)
      .each('end', repeat);
  }) ();

}

// ***** VISUALIZATION LOADER *****
function visualizePlaylist(playlistSongsAttributes, callback) {

  $('g').remove();
  callback(playlistSongsAttributes);

} // end of visualizePlaylist


