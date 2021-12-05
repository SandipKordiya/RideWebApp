import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../_services/bookings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upcomming-booking',
  templateUrl: './upcomming-booking.component.html',
  styleUrls: ['./upcomming-booking.component.css']
})
export class UpcommingBookingComponent implements OnInit {
  items: Array<any>;
  constructor(private bookService: BookingsService, private router: Router) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.bookService.allpending()
    .subscribe(result => {
      this.items = result;
    });
  }

  viewDetails(item) {
    console.log(item.payload.doc.id);
    this.router.navigate(['/booking/view/' + item.payload.doc.id]);
  }
}
