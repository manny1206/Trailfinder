import { Component,OnInit, SystemJsNgModuleLoader, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

declare  var jQuery:  any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  route_curr: string;

  constructor() {
  }
  ngOnInit() {
  }
}
