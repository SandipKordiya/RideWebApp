import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../_services/bookings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-bookings',
  templateUrl: './list-bookings.component.html',
  styleUrls: ['./list-bookings.component.css']
})
export class ListBookingsComponent implements OnInit {
  items: Array<any>;
  constructor(private bookService: BookingsService, private router: Router) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.bookService.getall()
    .subscribe(result => {
      this.items = result;
    });
  }

  viewDetails(item) {
    console.log(item.payload.doc.id);
    this.router.navigate(['/booking/view/' + item.payload.doc.id]);
  }

  filter() {
    this.bookService.allpending()
    .subscribe(result => {
      this.items = result;
      console.log(this.items);
    });
  }

  filterbydate() {
    this.bookService.getbydate()
    .subscribe(result => {
      this.items = result;
      console.log(this.items);
    });
  }

}
