import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingsService } from '../_services/bookings.service';
import * as moment from 'moment';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {
  item: any;
  rates: any;
  pricekm: any;
  nextDay: Date;
  constructor(private route: ActivatedRoute,  private router: Router,
    private bookService: BookingsService) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      console.log('data' + data);
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        // this.dt = moment(this.item.createdAt).fromNow();
      }
    });
    this.rate();
  }
  rate() {
    this.bookService.getrate()
      .subscribe(result => {
        this.rates = result;
        this.pricekm = this.rates.payload.data().kmrate;
      });
      return this.pricekm;
  }
  // onSubmit(value){
  //   value.avatar = this.item.avatar;
  //   value.age = Number(value.age);
  //   this.firebaseService.updateUser(this.item.id, value)
  //   .then(
  //     res => {
  //       this.router.navigate(['/home']);
  //     }
  //   )
  // }

  // delete(){
  //   this.firebaseService.deleteUser(this.item.id)
  //   .then(
  //     res => {
  //       this.router.navigate(['/home']);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   )
  // }

  // cancel(){
  //   this.router.navigate(['/home']);
  // }
}
