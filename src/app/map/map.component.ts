import { Component,OnInit, SystemJsNgModuleLoader, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {} from 'googlemaps';

declare  var jQuery:  any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {
  @ViewChild('map',{static: false}) gmap: ElementRef;
  map: google.maps.Map;

  lat = 40.730610;
  lng = -73.935242;
  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8,
  };

  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  });

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, 
    this.mapOptions);
   }

  ngAfterViewInit() {
    this.mapInitializer();
    this.marker.setMap(this.map);
  }
}
