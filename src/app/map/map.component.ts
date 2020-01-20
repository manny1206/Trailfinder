import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {} from 'googlemaps';
import { DatashareService } from '../services/datashare.service';

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
  //searched map location
  map: google.maps.Map;
  placeid: string;//placeid recieved from search
  
  //if user wants to use current position

  //default map location(newyork)
  latdef = 40.730610;
  lngdef = -73.935242;
  defcoord = new google.maps.LatLng(this.latdef, this.lngdef);
  //map setup
  mapOptions: google.maps.MapOptions = {
    center: this.defcoord,
    zoom: 15,
  };

  FIND = this.setFIND(this.placeid,this.defcoord);
  //MAP FUNCTIONS/////////////////////////////////////
  constructor(private data: DatashareService) { }
  setFIND(placeid, defcoord) {
    var find;
    var findservice = new google.maps.places.PlacesService(this.map);;
    var findrequest;//get details from placeid
    if (placeid != null && placeid != '') {
      findrequest = {
        placeId: placeid,
        fields: ['name', 'formatted_address', 'geometry']
      };
      
      findservice.getDetails(findrequest, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });
        }
      }
    } else {
      find = 
    }
  }
  generateFINDplaces() {
    //search 10km radius of searched location

  }
  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement,this.mapOptions);
   }
  
  ngAfterViewInit() {
    this.mapInitializer();
    this.FIND.setMap(this.map);
  }
  /////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.placeid = message);
  }
}
