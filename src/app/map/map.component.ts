import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {} from 'googlemaps';
import { DatashareService } from '../services/datashare.service';
import { map } from 'rxjs/operators';

declare  var jQuery:  any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {
  ////////////////////////////!!!MAP!!!////////////////////////////////////////
  @ViewChild('map',{static: false}) gmap: ElementRef;
  //MAP FIELDS////////////////////////////////////////
  placeid: string;//placeid recieved from search
  //default map location(newyork)
  latdef = 40.730610;
  lngdef = -73.935242;
  defcoord = new google.maps.LatLng(this.latdef, this.lngdef);
  //searched map location
  map: google.maps.Map;
  mapOptions: google.maps.MapOptions = {
    center: this.defcoord,
    zoom: 12,
    styles: [
      {"elementType": "geometry",
       "stylers": [{"color": "#212121"}]
      },
      {"elementType": "labels.icon",
       "stylers": [{"visibility": "off"}]
      },
      {"elementType": "labels.text.fill",
       "stylers": [{"color": "#757575"}]
      },
      {"elementType": "labels.text.stroke",
       "stylers": [{"color": "#212121"}]
      },
      {"featureType": "administrative",
       "elementType": "geometry",
       "stylers": [{"color": "#757575"}]
      },
      {"featureType": "administrative.country",
       "elementType": "labels.text.fill",
       "stylers": [{"color": "#9e9e9e"}]
      },
      {"featureType": "administrative.land_parcel",
       "stylers": [{"visibility": "off"}]
      },
      {"featureType": "administrative.locality",
       "elementType": "labels.text.fill",
       "stylers": [{"color": "#bdbdbd"}]
      },
      {"featureType": "poi",
       "elementType": "labels.text.fill",
       "stylers": [{"color": "#757575"}]
      },
      {"featureType": "poi.park",
       "elementType": "geometry",
       "stylers": [{"color": "#181818"}]
      },
      {"featureType": "poi.park",
       "elementType": "labels.text.fill",
       "stylers": [{"color": "#616161"}]
      },
      {"featureType": "poi.park",
       "elementType": "labels.text.stroke",
       "stylers": [{"color": "#1b1b1b"}]
      },
      {"featureType": "road",
       "elementType": "geometry.fill",
       "stylers": [{"color": "#2c2c2c"}]
      },
      {"featureType": "road",
       "elementType": "labels.text.fill",
       "stylers": [{"color": "#8a8a8a"}]
      },
      {"featureType": "road.arterial",
       "elementType": "geometry",
       "stylers": [{"color": "#373737"}]
      },
      {"featureType": "road.highway",
       "elementType": "geometry",
       "stylers": [{"color": "#3c3c3c"}]
      },
      {"featureType": "road.highway.controlled_access",
       "elementType": "geometry",
       "stylers": [{"color": "#4e4e4e"}]
      },
      {"featureType": "road.local",
       "elementType": "labels.text.fill",
       "stylers": [{"color": "#616161"}]
      },
      {"featureType": "transit",
       "elementType": "labels.text.fill",
       "stylers": [{"color": "#757575"}]
      },
      {"featureType": "water",
       "elementType": "geometry",
       "stylers": [{"color": "#000000"}]
      },
      {"featureType": "water",
       "elementType": "labels.text.fill",
       "stylers": [{"color": "#3d3d3d"}]
      }
    ]
  };
  findrequest;

  //if user wants to use current location
  
  //MAP FUNCTIONS/////////////////////////////////////
  constructor(private data: DatashareService) { }
  generateSearchRadius() {
    //search 10km radius of searched location

  }
  ngAfterViewInit() {//map initializer
    var mapOptions = this.mapOptions;
    var map = new google.maps.Map(this.gmap.nativeElement,mapOptions);
    var bounds = new google.maps.LatLngBounds();
    var infowindow = new google.maps.InfoWindow;
    var address;
    var newAddr;
    var icons = {
      find: {
        icon: {
          url: "../general/img/find_marker.png",
          scaledSize: new google.maps.Size(96,96)
        }
      },
      trail: {
        icon: {
          url: "../general/img/trail_marker.png",
          scaledSize: new google.maps.Size(64,64)
        }
      }
    };
    var findservice = new google.maps.places.PlacesService(map);
    var placeid = this.placeid;
    //USE THIS IF USER ENTERS LOCATION MANUALLY////////////////////////////////
    if (placeid != null && placeid != '') {//get details from placeid
      this.findrequest = {placeId: placeid.trim()};
      //access place data to plot on map
      findservice.getDetails(this.findrequest,
        function(result, status) {
          console.log(result);
          //draw marker and add to map, using placeid location
          var marker = new google.maps.Marker({
            map: map,
            place: {
              placeId: placeid,
              location: result.geometry.location
            }
          });
          console.log(result.geometry.location.toUrlValue(6));
          map.setCenter(result.geometry.location);
          //draw circle at marker location
          var circle = new google.maps.Circle({
            map: map,
            center: result.geometry.location,
            radius: 15000, //15km in meters
            fillColor: '#2cb178',
            fillOpacity: 0.35,
            strokeColor: '#2cb178',
            strokeOpacity: 0.8,
            strokeWeight: 2,
          });
          //set up infowindow and center map on marker
          address = result.adr_address;
          newAddr = address.split("</span>,");
          infowindow = new google.maps.InfoWindow({});
          infowindow.setContent(result.name + "<br>" + newAddr[0] + "<br>" + newAddr[1] + "<br>" + newAddr[2]);
          google.maps.event.addListener(marker,'click',function(){
            infowindow.open(map,marker);
            circle.setVisible(true);
            circle.setCenter(result.geometry.location);
          });
          google.maps.event.addListener(infowindow, 'domready', function() {
            map.setCenter(marker.getPosition());
          });
          infowindow.open(map, marker);
          
          //get nearby places 'n stuff
          getNearbyPlaces(result.geometry.location);
        }
      );
    //USE THIS IF THEY'RE USING CURRENT LOCATION///////////////////////////////
    } else {
      var pos = this.defcoord;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
          bounds.extend(pos);

          infowindow.setPosition(pos);
          infowindow.setContent('Current Location');
          infowindow.open(map);
          map.setCenter(pos);
          //draw circle at marker location
          var circle = new google.maps.Circle({
            map: map,
            center: pos,
            radius: 15000, //15km in meters
            fillColor: '#2cb178',
            fillOpacity: 0.35,
            strokeColor: '#2cb178',
            strokeOpacity: 0.8,
            strokeWeight: 2,
          });
        }, () => {
          // Browser supports geolocation, but user has denied permission
          handleLocationError(true, infowindow);
        });
      } else {
        // Browser doesn't support geolocation
        handleLocationError(false, infowindow);
      }
    }
    ///INTERAL FUNCTIONS//////////////////////////////////
      //1.Handle a geolocation error//
    function handleLocationError(browserHasGeolocation, infoWindow) {
      var currentInfoWindow;
      // Set default location
      pos = this.defcoord;
      map = new google.maps.Map(this.gmap.nativeElement, mapOptions);
      // Display an InfoWindow at the map center
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Geolocation permissions denied. Using default location.' :
        'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
      currentInfoWindow = infoWindow;

      getNearbyPlaces(pos);
    }
    //2.handle nearby places
    function getNearbyPlaces(position) {
      var request = {
        location: position,
        rankBy: google.maps.places.RankBy.DISTANCE,
        keyword: 'trail'
      };
      findservice.nearbySearch(request, nearbyCallback); 
    }
    function nearbyCallback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        createMarkers(results);
      }
    }
    function createMarkers(places) {
      places.forEach(place => {
        let marker = new google.maps.Marker({
          position: place.geometry.location,
          map: map,
          title: place.name
        });
        //TODO: CLICK LISTENERS

        bounds.extend(place.geometry.location);
      });
      map.fitBounds(bounds);
    }
    //TODO: PLACE DETAILS IN INFOWINDOW
  }
  /////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.placeid = message.trim());
  }
}
