import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FareEstimateService {

constructor(public db: AngularFirestore) { }
getrate() {
  return this.db.collection('rate').doc('CQABeGqpPIv4ID4VymJx').snapshotChanges();
}
createbooking(value) {
  return this.db.collection('bookings').add(value);
}
}
