import { Component, OnInit, Input, ElementRef, NgZone, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';


@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})
export class SearchformComponent implements OnInit {
  title = 'app';
  @ViewChild('places') places: GooglePlaceDirective;
  @ViewChild('search' ) public searchElement: ElementRef;
  model: any = {};
  @ViewChild('placesRef') placesRef: ElementRef;
  @ViewChild('placesRef1') placesRef1: ElementRef;
  lat: any;
  lng: any;
  lat1: any;
  lng1: any;
  origin: any;
  destination: any;
  renderOptions = {
    suppressMarkers: true
} ;
 markerOptions = {
    origin: {
        icon:
        'https://d1a3f4spazzrp4.cloudfront.net/uber-com/1.3.8/d1a3f4spazzrp4.cloudfront.net/images/fare-estimate/pickup-h-5731548595.svg',
        draggable: false,
    },
    destination: {
        icon:
        'https://d1a3f4spazzrp4.cloudfront.net/uber-com/1.3.8/d1a3f4spazzrp4.cloudfront.net/images/fare-estimate/dropoff-h-42fb8dd6bd.svg',
        draggable: false,
    },
};
  constructor() { }

  ngOnInit() {
  }

}
