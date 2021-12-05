import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public db: AngularFirestore, private router: Router) { }

  getall() {
    return this.db.collection('users').snapshotChanges();
  }
}
