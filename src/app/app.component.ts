import { Component,OnInit, SystemJsNgModuleLoader } from '@angular/core';
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

  constructor(location: Location, router: Router) {//store location changes
    router.events.subscribe(val => {
      if (location.path() != "") {
        this.route_curr = location.path();
        console.log(this.route_curr);
      } else {
        this.route_curr = "Home";
      }
    });
  }
  ngOnInit() {
  }
}
