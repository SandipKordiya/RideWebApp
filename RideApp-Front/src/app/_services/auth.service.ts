import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { User } from 'firebase';
import { map } from 'rxjs/operators';
import {Observable, Subject, BehaviorSubject} from 'rxjs';
import { AuthInfo } from '../_modal/auth-info';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  UNKNOWN_USER = new AuthInfo(null);

  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(this.UNKNOWN_USER);
  constructor(
    private afAuth: AngularFireAuth, private router: Router,
     public db: AngularFirestore, private location: Location) {}

    doRegister(users) {
      return new Promise<any>((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(users.email, users.password)
        .then(res => {
          resolve(res);
          const userDataRef = this.db.doc(`/users/${res.user.uid}`);
          return userDataRef.set(users);
        }, err => reject(err));
      });
    }
    doLogin(email: string, password: string): Observable<AuthInfo> {
      return this.fromFirebaseAuthPromise(this.afAuth.auth.signInWithEmailAndPassword(email, password));
    }
    fromFirebaseAuthPromise(promise): Observable<any> {
      const subject = new Subject<any>();
      promise
          .then(res => {
                  const authInfo = new AuthInfo(this.afAuth.auth.currentUser.uid);
                  localStorage.setItem('uid', this.afAuth.auth.currentUser.uid);
                  this.authInfo$.next(authInfo);
                  subject.next(res);
                  subject.complete();
              },
              err => {
                  this.authInfo$.error(err);
                  subject.error(err);
                  subject.complete();
              });
      return subject.asObservable();
  }

    logout() {
      this.afAuth.auth.signOut();
      this.authInfo$.next(this.UNKNOWN_USER);
      localStorage.removeItem('uid');
      this.load();
    }

    load() {
      location.reload();
      this.router.navigate(['/home']);
    }

    getToken() {
      return firebase.auth().currentUser.getIdToken();
    }
}
