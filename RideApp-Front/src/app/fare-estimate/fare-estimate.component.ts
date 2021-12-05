import { Component, OnInit, Input, ElementRef, NgZone, ViewChild, TemplateRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import {} from 'googlemaps';

import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { FareEstimateService } from '../_services/fare-estimate.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-fare-estimate',
  templateUrl: './fare-estimate.component.html',
  styleUrls: ['./fare-estimate.component.css']
})
export class FareEstimateComponent implements OnInit {
  title = 'app';
  @ViewChild('places') places: GooglePlaceDirective;
  @ViewChild('search' ) public searchElement: ElementRef;
  model: any = {};
  book: any = {};
  user: any;
  items: any;
  kmarea: any;
  pricekm: number;
  arrivetime: any;
  totaldistance: any;
  price1: any;
  @ViewChild('placesRef') placesRef: ElementRef;
  @ViewChild('placesRef1') placesRef1: ElementRef;
  lat: any;
  lng: any;
  lat1: any;
  lng1: any;
  origin: any;
  destination: any;
  zoom: Number = 14;
  renderOptions = {
    suppressMarkers: true,
};
modalRef: BsModalRef;
  config = {
    animated: false
  };
 markerOptions = {
    origin: {
        icon:
        'https://d1a3f4spazzrp4.cloudfront.net/uber-com/1.3.8/d1a3f4spazzrp4.cloudfront.net/images/fare-estimate/pickup-h-5731548595.svg',
        draggable: true,
    },
    destination: {
        icon:
        'https://d1a3f4spazzrp4.cloudfront.net/uber-com/1.3.8/d1a3f4spazzrp4.cloudfront.net/images/fare-estimate/dropoff-h-42fb8dd6bd.svg',
        draggable: false,
    },
};
  constructor( private mapsAPILoader: MapsAPILoader, private spinner: NgxSpinnerService,
    private ngZone: NgZone, public fareService: FareEstimateService,
     private modalService: BsModalService, private router: Router,
     public userService: UserService,
     public authService: AuthService) { }

  ngOnInit() {
    this.spinner.show();
    this.getPosition();
    this.getData();
    setTimeout(() => {
        this.spinner.hide();
    }, 1000);
  }
  handleAddressChange(address) {
    this.book.address1 = address.formatted_address;
    this.lng = address.geometry.location.lng();
    this.lat  = address.geometry.location.lat();
    localStorage.setItem('lng1',  this.lng);
    localStorage.setItem('lat1',  this.lat);
    this.getPosition();
  }
  handleAddressChange2(address) {
    this.spinner.show();
    this.book.address2 = address.formatted_address;
    this.lng1 = address.geometry.location.lng();
    this.lat1  = address.geometry.location.lat();
    this.origin = { lat: Number(localStorage.getItem('lat1')), lng: Number(localStorage.getItem('lng1')) };
    this.destination = { lat: this.lat1, lng: this.lng1};
    this.getDirection(Number(localStorage.getItem('lat1')), Number(localStorage.getItem('lng1')), this.lat1, this.lng1);
    this.rate();
    this.getDistancia(this.origin, this.destination);
    // console.log(distance);
    console.log(this.pricekm);
    this.spinner.hide();
  }

  getDirection(lat1: number, lon1: number, lat2: number, lon2: number) {
    this.origin = { lat: lat1, lng: lon1 };
    this.destination = { lat: lat2, lng: lon2 };
    this.book.origin = this.origin;
    this.book.destination = this.destination;
    // this.origin = 'Taipei Mainz Station'
    // this.destination = 'Taiwan Presidential Office'
  }


    getPosition = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve(position.coords);
          this.lat = position.coords['latitude'];
          this.lng = position.coords['longitude'];
        }, (err) => {
          reject(err);
        });
      });
    }

    rate() {
      this.fareService.getrate()
        .subscribe(result => {
          this.items = result;
          this.pricekm = this.items.payload.data().kmrate;
          console.log(this.pricekm);
        });
        return this.pricekm;
    }
    getDistancia(origen: string, destino: string) {
      return new google.maps.DistanceMatrixService().getDistanceMatrix({'origins': [origen], 'destinations': [destino],
      travelMode: google.maps.TravelMode.DRIVING}, (results: any) => {
        this.totaldistance = results.rows[0].elements[0].distance.text;
        this.arrivetime = results.rows[0].elements[0].duration.text;
        this.price1 = parseFloat(this.totaldistance);
        console.log('price1', this.price1);
          console.log('resultados distancia -- ', results.rows[0].elements[0].distance.text);
          console.log('resultados duration) -- ', results.rows[0].elements[0].duration.text);
          this.book.distance = results.rows[0].elements[0].distance.text;
          this.book.duration = results.rows[0].elements[0].duration.text;
      });
    }
    openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template, this.config);
    }
    decline(): void {
      this.modalRef.hide();
    }

    onSubmit() {
      this.book.createdAt = new Date();
      this.book.status = 'pending';
      this.fareService.createbooking(this.book);
      this.decline();
      this.getPosition();
      location.reload();
    }

    getData() {
      this.userService.getuser()
      .subscribe(result => {
        this.user = result.payload.data();
        this.book.name = this.user.firstname;
        this.book.phone = this.user.phone;
        console.log(this.user);
      });
    }
}
