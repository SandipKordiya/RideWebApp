import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(public db: AngularFirestore, private router: Router) {}

  getall() {
    return this.db.collection('drivers').valueChanges();
  }
  getUser(userKey) {
    return this.db.collection('drivers').doc(userKey).snapshotChanges();
  }

  getUsers() {
    return this.db.collection('drivers').snapshotChanges();
  }

  createUser(value) {
    return this.db.collection('drivers').add({
      name: value.name,
      phone: value.phone,
      address: value.address,
      email: value.email,
      drivingId: value.drivingId
    });
  }

  updateUser(userKey, value) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('drivers').doc(userKey).set(value);
  }

  delete(Key) {
    return this.db.collection('drivers').doc(Key).delete();
  }
}
