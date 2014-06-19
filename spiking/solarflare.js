// ***** VISUALIZATION *****


var svgMargin     = {top: 10, right: 10, bottom: 10, left: 10};

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
function solarFlare(playlistSongsAttributes) {

  var radius = Math.min(svgWindow.width, svgWindow.height) / 2
  var color = d3.scale.category20c();

  var canvas = makeCanvas()
    .attr("width", svgWindow.width)
    .attr("height", svgWindow.height)
    .append("g")
    .attr("transform", "translate(" + svgWindow.width / 2 + "," + svgWindow.height * .52 + ")");

  var partition = d3.layout.partition()
    .sort(null)
    .size([2 * Math.PI, radius * radius])
    .value(function(d) { return 1; });

  var arc = d3.svg.arc()
    .startAngle(function(d) { return d.x; })
    .endAngle(function(d) { return d.x + d.dx; })
    .innerRadius(function(d) { return Math.sqrt(d.y); })
    .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

////////////
  var title = playlistSongsAttributes.title;
  var energy = playlistSongsAttributes.energy;
  var liveness = playlistSongsAttributes.liveness;
  var tempo = playlistSongsAttributes.tempo;
  var acousticness = playlistSongsAttributes.acousticness;
  var loudness = playlistSongsAttributes.loudness;
  var valence = playlistSongsAttributes.valence;
  var danceability = playlistSongsAttributes.danceability;
////////////
var playlistAttr = playlistSongsAttributes;
delete playlistAttr.title
delete playlistAttr.artist
delete playlistAttr.image_url
delete playlistAttr.preview_url

var data = JSON.stringify(playlistAttr);

d3.json(data, function(error, root) {
  var path = canvas.datum(root).selectAll("path")
  .data(partition.nodes)
  .enter().append("path")
      .attr("display", function(d) { return d.depth ? null : "none"; }) // hide inner ring
      .attr("d", arc)
      .style("stroke", "#fff")
      .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
      .style("fill-rule", "evenodd")
      .each(stash);

      d3.selectAll("input").on("change", function change() {
        var value = this.value === "count"
        ? function() { return 1; }
        : function(d) { return d.size; };

        path
        .data(partition.value(value).nodes)
        .transition()
        .duration(1500)
        .attrTween("d", arcTween);
      });
    });
}
/////////UPDATED VERSION//////////
function solarFlare(playlistSongsAttributes) {

  var radius = Math.min(svgWindow.width, svgWindow.height) / 2
  var color = d3.scale.category20c();

  var canvas = makeCanvas()
    .attr("width", svgWindow.width)
    .attr("height", svgWindow.height)
    .append("g")
    .attr("transform", "translate(" + svgWindow.width / 2 + "," + svgWindow.height * .52 + ")");

  var partition = d3.layout.partition()
    .sort(null)
    .size([2 * Math.PI, radius * radius])
    .value(function(d) { return 1; });

  var arc = d3.svg.arc()
    .startAngle(function(d) { return d.x; })
    .endAngle(function(d) { return d.x + d.dx; })
    .innerRadius(function(d) { return Math.sqrt(d.y); })
    .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

////////////
  var title = playlistSongsAttributes.title;
  var energy = playlistSongsAttributes.energy;
  var liveness = playlistSongsAttributes.liveness;
  var tempo = playlistSongsAttributes.tempo;
  var acousticness = playlistSongsAttributes.acousticness;
  var loudness = playlistSongsAttributes.loudness;
  var valence = playlistSongsAttributes.valence;
  var danceability = playlistSongsAttributes.danceability;
////////////
var playlistAttr = playlistSongsAttributes;
delete playlistAttr.title
delete playlistAttr.artist
delete playlistAttr.image_url
delete playlistAttr.preview_url

var root = {"name": "Dmitry", "children": {
  "energy": energy,
  "liveness": liveness
}};
console.log(root);
// d3.json(data, function(error, root) {
  var path = canvas.datum(root).selectAll("path")
  .data(partition.nodes)
  .enter().append("path")
      .attr("display", function(d) { return null; }) // hide inner ring
      .attr("d", arc)
      .style("stroke", "#fff")
      .style("fill", function(d) { return "blue"; })
      .style("fill-rule", "evenodd")
      .each(stash);

      d3.selectAll("input").on("change", function change() {
        var value = this.value === "count"
        ? function() { return 1; }
        : function(d) { return d.size; };

        path
        .data(partition.value(value).nodes)
        .transition()
        .duration(1500)
        .attrTween("d", arcTween);
      });
    //});

function stash(d) {
  d.x0 = d.x;
  d.dx0 = d.dx;
}

// Interpolate the arcs in data space.
function arcTween(a) {
  var i = d3.interpolate({x: a.x0, dx: a.dx0}, a);
  return function(t) {
    var b = i(t);
    a.x0 = b.x;
    a.dx0 = b.dx;
    return arc(b);
  };
}

d3.select(self.frameElement).style("height", svgWindow.height + "px");

}

$(playlistSongsAttributes).each(function(i, elem) {
  {
    name: 'Playlist',
    children: [
    {
      name: 'Energy',
      children: [{'name': title[i],'value': energy[i]}]
    }
  ]
}

})

// {
//   name: "Your songs' hidden powers",
//   children: [
//     {
//       name: "energy",
//       children: [
//         {
//           name: "Like a virgin",
//           value: 3
//         },
//         {
//           name: "Men in Black",
//           value: 8
//         }
//       ]
//     },
//     {
//       name: "liveness",
//       children: [
//         {
//           name: "Like a virgin",
//           value: -7
//         },
//         {
//           name: "Men in Black",
//           value: 5
//         }
//       ]
//     }
//   ]
// }
