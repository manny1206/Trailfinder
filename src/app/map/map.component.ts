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
  find;
  //searched map location
  map: google.maps.Map;
  placeid: string;//placeid recieved from search
  findservice;
  findrequest;
  //if user wants to use current position

  //default map location(newyork)
  latdef = 40.730610;
  lngdef = -73.935242;
  defcoord = new google.maps.LatLng(this.latdef, this.lngdef);
  mapOptions: google.maps.MapOptions = {
    center: this.defcoord,
    zoom: 15,
  };
  //MAP FUNCTIONS/////////////////////////////////////
  constructor(private data: DatashareService) { }
  generateFINDplaces() {
    //search 10km radius of searched location

  }
  mapInitializer() {
    
   }
  
  ngAfterViewInit() {
    this.map = new google.maps.Map(this.gmap.nativeElement,this.mapOptions);
    this.findservice = new google.maps.places.PlacesService(this.map);;
    if (this.placeid != null && this.placeid != '') {//get details from placeid
      this.findrequest = {
        placeId: this.placeid,
        fields: ['name', 'formatted_address', 'geometry']
      };
      
      this.findservice.getDetails(this.findrequest, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.find = new google.maps.Marker({
            map: this.map,
            position: place.geometry.location
          });
        }
      });
    } else {//TODO: implement current user location
      this.find = new google.maps.Marker({
        position: this.defcoord,
        map: this.map
      });
    }
    
  }
  /////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.placeid = message);
  }
}
