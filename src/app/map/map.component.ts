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
  find;
  //searched map location
  map: google.maps.Map;
  placeid: string;//placeid recieved from search
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
  generateFINDplaces() {
    //search 10km radius of searched location

  }
  mapInitializer() {
    
   }
  
  ngAfterViewInit() {
    var mapOptions: google.maps.MapOptions = {
      center: this.defcoord,
      zoom: 15,
    };
    this.map = new google.maps.Map(this.gmap.nativeElement,mapOptions);
    this.infowindow = new google.maps.InfoWindow();
    var findservice = new google.maps.places.PlacesService(this.map);
    if (this.placeid != null && this.placeid != '') {//get details from placeid
      this.findrequest = {placeId: this.placeid.trim()};
      
      this.findservice.getDetails(this.findrequest,
        function(result, status) {
          if (status != google.maps.places.PlacesServiceStatus.OK) {
            alert(status);
            return;
          }
          console.log(result);
          var marker = new google.maps.Marker({
            map: this.map,
            place: {
              placeId: this.placeid,
              location: result.geometry.location
            }
          });
          console.log(result.geometry.location.toUrlValue(6));
          this.map.setCenter(result.geometry.location);
          var address = result.adr_address;
          var newAddr = address.split("</span>,");
          this.infowindow.setContent(result.name + "<br>" + newAddr[0] + "<br>" + newAddr[1] + "<br>" + newAddr[2]);
          google.maps.event.addListener(this.infowindow, 'domready', function() {
            this.map.setCenter(marker.getPosition());
          });
          this.infowindow.open(map, marker);
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
    this.data.currentMessage.subscribe(message => this.placeid = message);
  }
}
