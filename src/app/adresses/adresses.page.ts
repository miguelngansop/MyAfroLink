import {Component, OnInit, ViewChild} from '@angular/core';
import {GoogleMapsComponent } from '../google-maps/google-maps.component';

@Component({
  selector: 'app-adresses',
  templateUrl: './adresses.page.html',
  styleUrls: ['./adresses.page.css'],
})
export class AdressesPage implements OnInit {

  @ViewChild(GoogleMapsComponent, {static: false} ) mapComponent: GoogleMapsComponent;

  constructor() {

  }

  testMarker() {

    let center = this.mapComponent.map.getCenter();
    this.mapComponent.addMarker(center.lat(), center.lng());

  }

  ngOnInit(): void {
  }

}
