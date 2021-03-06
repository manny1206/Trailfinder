import { Component, OnInit, NgZone } from '@angular/core';
import { DatashareService } from '../services/datashare.service';
import { AutocompleteTextComponent } from '../autocomplete-text/autocomplete-text.component';
declare  var jQuery:  any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  address;
  establishmentAddress;

  formattedAddress: string;
  formattedEstablishmentAddress: string;

  placeid: string;
  
  find;
  options = {
    componentRestrictions : {
      country: ['us']
    }
  }
  constructor(private data: DatashareService, public zone: NgZone) { }
//Places Funtions//////////////////////////////////////////////////////////////
  getAddress(place: object) {
    this.address = place['formatted_address'];
    this.formattedAddress = place['formatted_address'];
    this.zone.run(() => this.formattedAddress = place['formatted_address']);
    this.placeid = place['place_id'];
    this.zone.run(() => this.placeid = place['place_id']);
  }
//Datashare Functions//////////////////////////////////////////////////////////
  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.placeid = message);
  }
  public handleAddressChange(address: any) {
    this.formattedAddress = address.formatted_address;
}
  searchfind(placeid) {
    this.data.changeMessage(placeid);
  }
}
