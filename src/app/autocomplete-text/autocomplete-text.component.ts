import { Component, OnInit, ViewChild, EventEmitter, Output, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-autocomplete-text',
  templateUrl: './autocomplete-text.component.html',
  styleUrls: ['./autocomplete-text.component.css']
})
export class AutocompleteTextComponent implements OnInit, AfterViewInit {
  @Input() addressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext', {static: false}) addresstext: any;

  autocompleteInput: string;
  queryWait: boolean;

  constructor() { }

  ngOnInit() { }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
      {
        componentRestrictions: {country: 'US'},
        types: [this.addressType]
      });
    google.maps.event.addListener(autocomplete,'place_changed',() => {
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
    });
  }

  invokeEvent(place: Object) {
    this.setAddress.emit(place);
  }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }
}
