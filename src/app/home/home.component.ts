import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../services/datashare.service';

declare  var jQuery:  any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  find: string;
  constructor(private data: DatashareService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.find = message)
  }
  searchFIND(find) {
    this.data.changeMessage(find);
  }
}
