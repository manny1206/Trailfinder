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
  @ViewChild('map',{static: false}) gmap: ElementRef;
  searchFIND: string;//place you have to find from to search
  map: google.maps.Map;
  //create FIND location, which user searched for
  latFIND = 40.730610;
  lngFIND = -73.935242;
  FINDcoord = new google.maps.LatLng(this.latFIND, this.lngFIND);

  mapOptions: google.maps.MapOptions = {
    center: this.FINDcoord,
    zoom: 15,
  };

  FIND = new google.maps.Marker({
    position: this.FINDcoord,
    map: this.map,
  });

  constructor(private data: DatashareService) { }
  generateFINDplaces() {
    //search 10km radius of FIND

  }
  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, 
    this.mapOptions);
   }
  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.searchFIND = message);
  }
  ngAfterViewInit() {
    this.mapInitializer();
    this.FIND.setMap(this.map);
  }
}
