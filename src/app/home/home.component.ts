import { Component, OnInit, Output, Input, EventEmitter, AfterViewInit } from '@angular/core';
import { DatashareService } from '../services/datashare.service';
import { AutocompleteTextComponent } from '../autocomplete-text/autocomplete-text.component';
declare  var jQuery:  any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formattedAddress: string;
  options = {
    componentRestrictions : {
      country: ['us']
    }
  }
  constructor(private data: DatashareService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.formattedAddress = message)
  }
  public handleAddressChange(address: any) {
    this.formattedAddress = address.formatted_address;
}
  searchFIND(find) {
    this.data.changeMessage(find);
  }
}
