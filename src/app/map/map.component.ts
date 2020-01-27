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
  //searched map location
  map: google.maps.Map;
  find;
  findservice;
  findrequest;
  infowindow;
  //if user wants to use current position

  //default map location(newyork)
  latdef = 40.730610;
  lngdef = -73.935242;
  defcoord = new google.maps.LatLng(this.latdef, this.lngdef);
  
  //MAP FUNCTIONS/////////////////////////////////////
  constructor(private data: DatashareService) { }
  generateSearchRadius() {
    //search 10km radius of searched location

  }
  ngAfterViewInit() {//map initializer
    var mapOptions: google.maps.MapOptions = {
      center: this.defcoord,
      zoom: 12,
      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "administrative.country",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#181818"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1b1b1b"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#2c2c2c"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8a8a8a"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#373737"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#3c3c3c"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#4e4e4e"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#000000"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#3d3d3d"
            }
          ]
        }
      ]
    };
    var map = new google.maps.Map(this.gmap.nativeElement,mapOptions);
    var findservice = new google.maps.places.PlacesService(map);
    var placeid = this.placeid;
    if (placeid != null && placeid != '') {//get details from placeid
      this.findrequest = {placeId: placeid.trim()};
      
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
          //draw circle and bind to marker
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
          var address = result.adr_address;
          var newAddr = address.split("</span>,");
          var infowindow = new google.maps.InfoWindow({});
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
        }
      );
    } else {//TODO: implement current user location
      this.find = new google.maps.Marker({
        position: this.defcoord,
        map: this.map
      });
    }
    
  }
  /////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.placeid = message.trim());
  }
}
