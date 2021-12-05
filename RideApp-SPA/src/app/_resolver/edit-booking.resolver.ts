import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { BookingsService } from '../_services/bookings.service';

@Injectable()
export class EditBookingResolver implements Resolve<any> {
  constructor(public bookService: BookingsService) { }
  resolve(route: ActivatedRouteSnapshot) {
    return new Promise((resolve, reject) => {
      const userId = route.paramMap.get('id');
      console.log(userId);
      this.bookService.getbooking(userId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
}
