import { Component,OnInit } from '@angular/core';
import { PreviousRouteService} from './previous-route.service';

declare  var jQuery:  any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Trailfinder';
  prev: string;

  constructor(
    private previousRouteService: PreviousRouteService
  ) {}
  ngOnInit() {
    this.prev = this.previousRouteService.getPreviousUrl();
  }
}
