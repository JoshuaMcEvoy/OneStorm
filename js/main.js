// ////////////////////////////
// //////// Address lng lat
// ////////////////////////////
//

// TODO: Need to move 'routePolygon' variable back once 'containsLocation' has been sorted
var routePolygon = {};



$(document).ready(function(){
  $('#submit-button').on('click', function() {
      let address = $('#address').val();
      let date = $('#date').val();
      console.log(date);

      // first request to geocoder to return list of possible results
      $.getJSON({
        dataType: "json",
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyA0nTL6VL4EzMx7Dcc4a8y-ImsLIl1SZU0`
      }).done(function(data){
        // console.log(data);
        // looping through the results and appending them to the body
        for (let i = 0; i < data.results.length; i++) {
          // creating <p> tag with formatted address as text.
          let addressResultItem = $("<p></p>").text(data.results[i].formatted_address).attr("href", "#").attr("class", "addressItem");
          // appending to parent div
          $('.addressSelection').append(addressResultItem);
        }
      }) // End of first geoCoder request
  }); // End of onclick event listener for submit button

  // delegating onclick for p tags to the parent div
  // this will send another request to geocoder with the users refined selection to return lng and lat
  $('.addressSelection').on('click', 'p', function(e){
    // console.log(e);
    // console.log(e.currentTarget.innerHTML);

    // second request to geocoder with refined search
    $.getJSON({
      dataType: "json",
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${e.currentTarget.innerHTML}&key=AIzaSyA0nTL6VL4EzMx7Dcc4a8y-ImsLIl1SZU0`
    }).done(function(data){
      // console.log(data.results[0].geometry.location);
      // location of the users house in lng and lat as an object
      let houseLocation = data.results[0].geometry.location;
      let lat = houseLocation.lat;
      let lng = houseLocation.lng;
      console.log(`lat = ${lat}`);
      console.log(`lng = ${lng}`);

      console.log(new google.maps.LatLng(lat, lng))
      // console.log(google.maps.LatLng(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng));
      // console.log(data.results[0].geometry.location.lat);
      // console.log(routePolygon);
      google.maps.geometry.poly.containsLocation(new google.maps.LatLng(lat, lng), routePolygon) ?
      console.log(`you're covered`) :
      console.log(`not in area `);

      // using the returned lng and lat to set a marker of the users house
      let marker = new google.maps.Marker({
        position: houseLocation,
        map: map,
        title: 'Your address'
      });
    }); // End of second geoCoder request

  }); // End of onclick event listener

}); // End document ready


////////////////////////////
//////// MAP
////////////////////////////

let map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4.3,
    center: new google.maps.LatLng(-25.2744,133.7751),
    mapTypeId: 'terrain'
  });

  // $.getJSON({
  //   dataType: "json",
  //   url: "https://agora.ex.nii.ac.jp/digital-typhoon/geojson/wnp/201602.en.json"
  // }).done(function(data){
  //   console.log(`data = ${data}`);
  //   console.log(`past request`);
  // });
  // console.log(`before request`);

  const agroaURL = 'http://agora.ex.nii.ac.jp/digital-typhoon/geojson/wnp/201602.en.json';

  // dummy json data for testing until
  // TODO: connect to actual API and get around cross origin error
  const jsonData =

  {
   "features" : [
      {
         "geometry" : {
            "coordinates" : [
               118.5,
               -12.9
            ],
            "type" : "Point"
         },
         "type" : "Feature",
         "properties" : {
            "display_time" : "2016-01-27 00:00 UTC",
            "wind" : "20",
            "pressure" : "1005",
            "time" : 1453852800,
            "class" : "2"
         }
      },
      {
         "geometry" : {
            "coordinates" : [
               118.5,
               -13.2
            ],
            "type" : "Point"
         },
         "type" : "Feature",
         "properties" : {
            "display_time" : "2016-01-27 06:00 UTC",
            "wind" : "20",
            "pressure" : "1005",
            "time" : 1453874400,
            "class" : "2"
         }
      },
      {
         "geometry" : {
            "coordinates" : [
               118.4,
               -13.7
            ],
            "type" : "Point"
         },
         "type" : "Feature",
         "properties" : {
            "display_time" : "2016-01-27 10:04 UTC",
            "wind" : "X",
            "pressure" : "X",
            "time" : 1453889040,
            "class" : "0"
         }
      },
      {
         "geometry" : {
            "coordinates" : [
               118.4,
               -13.9
            ],
            "type" : "Point"
         },
         "type" : "Feature",
         "properties" : {
            "display_time" : "2016-01-27 12:00 UTC",
            "wind" : "20",
            "pressure" : "1005",
            "time" : 1453896000,
            "class" : "2"
         }
      },
      {
         "geometry" : {
            "coordinates" : [
               118.4,
               -14.4
            ],
            "type" : "Point"
         },
         "type" : "Feature",
         "properties" : {
            "display_time" : "2016-01-27 18:00 UTC",
            "wind" : "25",
            "pressure" : "1003",
            "time" : 1453917600,
            "class" : "2"
         }
      },
      {
         "geometry" : {
            "coordinates" : [
               118.2,
               -15.3
            ],
            "type" : "Point"
         },
         "type" : "Feature",
         "properties" : {
            "display_time" : "2016-01-28 00:00 UTC",
            "wind" : "25",
            "pressure" : "1003",
            "time" : 1453939200,
            "class" : "2"
         }
      },
      {
         "geometry" : {
            "coordinates" : [
               117.6,
               -16.2
            ],
            "type" : "Point"
         },
         "type" : "Feature",
         "properties" : {
            "display_time" : "2016-01-28 05:07 UTC",
            "wind" : "X",
            "pressure" : "X",
            "time" : 1453957620,
            "class" : "0"
         }
      },
      {
         "geometry" : {
            "coordinates" : [
               117.6,
               -16.2
            ],
            "type" : "Point"
         },
         "type" : "Feature",
         "properties" : {
            "display_time" : "2016-01-28 06:00 UTC",
            "wind" : "25",
            "pressure" : "1000",
            "time" : 1453960800,
            "class" : "2"
         }
      },
      {
         "geometry" : {
            "coordinates" : [
               117.8,
               -16.4
            ],
            "type" : "Point"
         },
         "type" : "Feature",
         "properties" : {
            "display_time" : "2016-01-28 12:00 UTC",
            "wind" : "25",
            "pressure" : "998",
            "time" : 1453982400,
            "class" : "2"
         }
      },
      {
         "geometry" : {
            "coordinates" : [
               117.9,
               -16.6
            ],
            "type" : "Point"
         },
         "type" : "Feature",
         "properties" : {
            "display_time" : "2016-01-28 16:34 UTC",
            "wind" : "X",
            "pressure" : "X",
            "time" : 1453998840,
            "class" : "0"
         }
      },
      {
         "geometry" : {
            "coordinates" : [
               117.9,
               -16.7
            ],
            "type" : "Point"
         },
         "type" : "Feature",
         "properties" : {
            "display_time" : "2016-01-28 18:00 UTC",
            "wind" : "30",
            "pressure" : "998",
            "time" : 1454004000,
            "class" : "2"
         }
      },
      {
         "geometry" : {
            "coordinates" : [
               118,
               -17.1
            ],
            "type" : "Point"
         },
         "type" : "Feature",
         "properties" : {
            "display_time" : "2016-01-29 00:00 UTC",
            "wind" : "30",
            "pressure" : "996",
            "time" : 1454025600,
            "class" : "2"
         }
      },
      {
         "geometry" : {
            "coordinates" : [
               118.1,
               -17.4
            ],
            "type" : "Point"
         },
         "type" : "Feature",
         "properties" : {
            "display_time" : "2016-01-29 04:13 UTC",
            "wind" : "X",
            "pressure" : "X",
            "time" : 1454040780,
            "class" : "0"
         }
      },
      {
         "geometry" : {
            "coordinates" : [
               118.1,
               -17.5
            ],
            "type" : "Point"
         },
         "type" : "Feature",
         "properties" : {
            "display_time" : "2016-01-29 06:00 UTC",
            "wind" : "35",
            "pressure" : "990",
            "time" : 1454047200,
            "class" : "3"
         }
      },
      {
         "geometry" : {
            "coordinates" : [
               118.2,
               -17.6
            ],
            "type" : "Point"
         },
         "type" : "Feature",
         "properties" : {
            "display_time" : "2016-01-29 12:00 UTC",
            "wind" : "40",
            "pressure" : "990",
            "time" : 1454068800,
            "class" : "3"
         }
      },
      {
         "geometry" : {
            "coordinates" : [
               118.3,
               -17.8
            ],
            "type" : "Point"
         },
         "type" : "Feature",
         "properties" : {
            "display_time" : "2016-01-29 17:19 UTC",
            "wind" : "X",
            "pressure" : "X",
            "time" : 1454087940,
            "class" : "0"
         }
      },
      {
         "geometry" : {
            "coordinates" : [
               118.3,
               -17.8
            ],
            "type" : "Point"
         },
         "type" : "Feature",
         "properties" : {
            "display_time" : "2016-01-29 18:00 UTC",
            "wind" : "45",
            "pressure" : "987",
            "time" : 1454090400,
            "class" : "3"
         }
      },
      {
         "geometry" : {
            "coordinates" : [
               118.6,
               -17.9
            ],
            "type" : "Point"
         },
         "type" : "Feature",
         "properties" : {
            "display_time" : "2016-01-30 00:00 UTC",
            "wind" : "50",
            "pressure" : "984",
            "time" : 1454112000,
            "class" : "4"
         }
      },
      {
         "geometry" : {
            "coordinates" : [
               118.9,
               -18.6
            ],
            "type" : "Point"
         },
         "type" : "Feature",
         "properties" : {
            "display_time" : "2016-01-30 06:00 UTC",
            "wind" : "55",
            "pressure" : "980",
            "time" : 1454133600,
            "class" : "4"
         }
      },
      {
         "geometry" : {
            "coordinates" : [
               119.3,
               -19.1
            ],
            "type" : "Point"
         },
         "type" : "Feature",
         "properties" : {
            "display_time" : "2016-01-30 12:00 UTC",
            "wind" : "50",
            "pressure" : "980",
            "time" : 1454155200,
            "class" : "4"
         }
      },
      {
         "geometry" : {
            "coordinates" : [
               119.8,
               -19.8
            ],
            "type" : "Point"
         },
         "type" : "Feature",
         "properties" : {
            "display_time" : "2016-01-30 18:00 UTC",
            "wind" : "50",
            "pressure" : "980",
            "time" : 1454176800,
            "class" : "4"
         }
      },
      {
         "geometry" : {
            "coordinates" : [
               120,
               -21.2
            ],
            "type" : "Point"
         },
         "type" : "Feature",
         "properties" : {
            "display_time" : "2016-01-31 00:00 UTC",
            "wind" : "40",
            "pressure" : "987",
            "time" : 1454198400,
            "class" : "3"
         }
      },
      {
         "geometry" : {
            "coordinates" : [
               120.2,
               -22.4
            ],
            "type" : "Point"
         },
         "type" : "Feature",
         "properties" : {
            "display_time" : "2016-01-31 06:00 UTC",
            "wind" : "30",
            "pressure" : "993",
            "time" : 1454220000,
            "class" : "2"
         }
      },
      {
         "geometry" : {
            "coordinates" : [
               122.1,
               -24.2
            ],
            "type" : "Point"
         },
         "type" : "Feature",
         "properties" : {
            "display_time" : "2016-01-31 12:00 UTC",
            "wind" : "20",
            "pressure" : "999",
            "time" : 1454241600,
            "class" : "2"
         }
      },
      {
         "geometry" : {
            "coordinates" : [
               124.1,
               -26.1
            ],
            "type" : "Point"
         },
         "type" : "Feature",
         "properties" : {
            "display_time" : "2016-01-31 18:00 UTC",
            "wind" : "20",
            "pressure" : "998",
            "time" : 1454263200,
            "class" : "2"
         }
      },
      {
         "geometry" : {
            "coordinates" : [
               126,
               -27.9
            ],
            "type" : "Point"
         },
         "type" : "Feature",
         "properties" : {
            "display_time" : "2016-02-01 00:00 UTC",
            "wind" : "20",
            "pressure" : "997",
            "time" : 1454284800,
            "class" : "2"
         }
      }
   ],
   "type" : "FeatureCollection",
   "properties" : {
      "url" : "http://agora.ex.nii.ac.jp/digital-typhoon/summary/wsp/s/201608.html.en",
      "name" : "Stan",
      "basin" : "wsp",
      "id" : "201608",
      "display_name" : "Cyclone 201608 (Stan)"
   }
};

  // console.log(jsonData);


  const polyCoords = [];

  for (let i = 0; i < jsonData.features.length; i++) {
    polyCoords.push({lat: jsonData.features[i].geometry.coordinates[1], lng: jsonData.features[i].geometry.coordinates[0]});
  }
  // console.log(polyCoords);





  $.getJSON(agroaURL).done(function(data){
    debugger;
  }).done(function(data){

  })

  // console.log(`after request`);

  // console.log(polyCoords);


  // var cityCircle = new google.maps.Circle({
  //           strokeColor: '#FF0000',
  //           strokeOpacity: 0.8,
  //           strokeWeight: 2,
  //           fillColor: '#FF0000',
  //           fillOpacity: 0.35,
  //           map: map,
  //           center: citymap[city].center,
  //           radius: Math.sqrt(citymap[city].population) * 100
  //         });

  // let pointRadius;
  //
  // for (let i = 0; i < jsonData.features.length; i++) {
  //
  //   pointRadius = new google.maps.Circle({
  //     strokeColor: '#FF0000',
  //     strokeOpacity: 0.8,
  //     strokeWeight: 2,
  //     fillColor: '#FF0000',
  //     fillOpacity: 0.35,
  //     map: map,
  //     center: {lat: jsonData.features[i].geometry.coordinates[1], lng: jsonData.features[i].geometry.coordinates[0]},
  //     radius: 20000
  //   })
  // }

  //
  // let hurricanePoly = new google.maps.Polyline({
  //   paths: polyCoords,
  //   strokeColor: '#FF0000',
  //   strokeOpacity: 0.8,
  //   strokeWeight: 2,
  //   fillColor: '#FF0000',
  //   fillOpacity: 0.35
  // });
  // hurricanePoly.setMap(map);

  // let hurricanePath = new google.maps.Polyline({
  //         path: polyCoords,
  //         geodesic: true,
  //         strokeColor: '#FF0000',
  //         strokeOpacity: 1.0,
  //         strokeWeight: 2
  //       });
  //
  //       hurricanePath.setMap(map);

  /////////////
  /// Start of polyline buffering
  /////////////

  // routines to translate google.maps.Polyline paths to JSTS objects:
  const googleMaps2JTS = function(boundaries) {
    // console.log(boundaries[0].lat);
    // console.log(boundaries.getLength);
    // console.log(boundaries.getAt(i).lat());
    var coordinates = [];
    var length = 0;
    if (boundaries && boundaries.getLength) length = boundaries.getLength();
    else if (boundaries && boundaries.length) length = boundaries.length;
    for (let i = 0; i < length; i++) {
        if (boundaries.getLength) coordinates.push(new jsts.geom.Coordinate(
        boundaries.getAt(i).lat(), boundaries.getAt(i).lng()));
        else if (boundaries.length) coordinates.push(new jsts.geom.Coordinate(
        boundaries[i].lat, boundaries[i].lng));
    }
    return coordinates;
  };


  const jsts2googleMaps = function(geometry) {
    var coordArray = geometry.getCoordinates();
    GMcoords = [];
    for (var i = 0; i < coordArray.length; i++) {
      GMcoords.push(new google.maps.LatLng(coordArray[i].x, coordArray[i].y));
    }
    return GMcoords;
  }

  const directionsService = new google.maps.DirectionsService();
  const directionsDisplay = new google.maps.DirectionsRenderer();
  // var routePolygon;

  let request = {
    origin: 'Perth, Australia',
    destination: 'Sydney, Australia',
    travelMode: 'DRIVING'
  };

  directionsService.route(request, function (response, status) {

    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      // console.log(response.routes[0].overview_path);
      var overviewPath = response.routes[0].overview_path,
          overviewPathGeo = [];
      for (var i = 0; i < overviewPath.length; i++) {
          overviewPathGeo.push(
          [overviewPath[i].lng(), overviewPath[i].lat()]);
      }

      var distance = 20 / 111.12, // Roughly 10km
          geoInput = {
              type: "LineString",
              coordinates: overviewPathGeo
          };

      // console.log(overviewPath);

      // var geoInput = googleMaps2JTS(overviewPath);
      var geoInput = googleMaps2JTS(polyCoords);
      var geometryFactory = new jsts.geom.GeometryFactory();
      // console.log(geometryFactory);
      var shell = geometryFactory.createLineString(geoInput);
      var polygon = shell.buffer(distance);

      var oLanLng = [];
      // console.log(polygon);
      var oCoordinates = polygon._shell._points._coordinates;
      // console.log(oCoordinates);
      for (i = 0; i < oCoordinates.length; i++) {
          var oItem;
          oItem = oCoordinates[i];
          oLanLng.push(new google.maps.LatLng(oItem[1], oItem[0]));
      }

      // if (routePolygon && routePolygon.setMap) routePolygon.setMap(null);
      routePolygon = new google.maps.Polygon({
          paths: jsts2googleMaps(polygon),
          map: map
      });
      // console.log(typeof routePolygon);


      ////// containsLocation
      google.maps.event.addListener(map, 'click', function(e) {
        // var resultColor =
        //     google.maps.geometry.poly.containsLocation(e.latLng, routePolygon) ?
        //     'blue' :
        //     'red';

        var resultPath =
            google.maps.geometry.poly.containsLocation(e.latLng, routePolygon) ?
            console.log(`you're covered`) :
            console.log(`not in area ` + e.latLng);

        new google.maps.Marker({
          position: e.latLng,
          map: map,
          icon: {
            path: resultPath,
            // fillColor: resultColor,
            fillOpacity: .2,
            strokeColor: 'white',
            strokeWeight: .5,
            scale: 10
          }
        });
      });



    }
  });

  /////////////
  /// End of polyline buffering
  /////////////

}

// Loop through the results array and place a marker for each
// set of coordinates.
window.eqfeed_callback = function(results) {
  for (let i = 0; i < results.features.length; i++) {
    let coords = results.features[i].geometry.coordinates;
    let latLng = new google.maps.LatLng(coords[1],coords[0]);
    let marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }
}



/////////////////////////////////////////////////////

// var google;
// var map;
//
// function initialize() {
//   var map = new google.maps.Map(
//     document.getElementById("map_canvas"), {
//       center: new google.maps.LatLng(37.4419, -122.1419),
//       zoom: 13,
//       mapTypeId: google.maps.MapTypeId.ROADMAP
//     });
//   var someLine = new google.maps.Polyline({
//     path: [{
//       lat: 51.15,
//       lng: 15
//     }, {
//       lat: 49.15,
//       lng: 18
//     }],
//     geodesic: true,
//     strokeColor: '#000000',
//     strokeOpacity: 1.0,
//     strokeWeight: 5
//   });
//   someLine.setMap(map);
//   var lineWidth = 10000; // (meters)
//   var lineHeading = google.maps.geometry.spherical.computeHeading(someLine.getPath().getAt(0), someLine.getPath().getAt(1));
//   var p0a = google.maps.geometry.spherical.computeOffset(someLine.getPath().getAt(0), lineWidth, lineHeading + 90);
//   var p0b = google.maps.geometry.spherical.computeOffset(someLine.getPath().getAt(0), lineWidth, lineHeading - 90);
//   var p1a = google.maps.geometry.spherical.computeOffset(someLine.getPath().getAt(1), lineWidth, lineHeading + 90);
//   var p1b = google.maps.geometry.spherical.computeOffset(someLine.getPath().getAt(1), lineWidth, lineHeading - 90);
//
//
//   // how to convert above someLine into?:
//   var airway = new google.maps.Polygon({
//     paths: [p0a, p0b, p1b, p1a],
//     strokeColor: '#FF0000',
//     strokeOpacity: 0.8,
//     strokeWeight: 3,
//     fillColor: '#FF0000',
//     fillOpacity: 0.35,
//     geodesic: true
//   });
//   airway.setMap(map);
//   var bounds = new google.maps.LatLngBounds();
//   for (var i = 0; i < airway.getPath().getLength(); i++) {
//     bounds.extend(airway.getPath().getAt(i));
//   }
//   map.fitBounds(bounds);
// }
// google.maps.event.addDomListener(window, "load", initialize);
