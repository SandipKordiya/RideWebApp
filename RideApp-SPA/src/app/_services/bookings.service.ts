import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import {Router} from '@angular/router';
import * as moment from 'moment';
import { equal } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
dt = new Date;
server_timestamp = new Date().getDate();
constructor(public db: AngularFirestore, private router: Router) { }
getall() {
  return this.db.collection('bookings').snapshotChanges();
}
getbooking(userKey) {
  const items = this.db.collection('bookings').doc(userKey).snapshotChanges();
  console.log(items);
  return items;
}
getrate() {
  return this.db.collection('rate').doc('CQABeGqpPIv4ID4VymJx').snapshotChanges();
}
allpending() {
  return this.db.collection('bookings', ref => ref.where('status', '==', 'pending'))
    .snapshotChanges();
}

getbydate() {
  const start = new Date('2019-01-23');
  // return this.db.collection('bookings', ref => ref.where('date', '==', start))
  //   .snapshotChanges();
  return this.db.collection('bookings', ref => ref.orderBy('date').startAfter(start))
    .snapshotChanges();
}
}
