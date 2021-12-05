import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  constructor(
    private afAuth: AngularFireAuth, private router: Router) {}

    login(email: string, password: string) {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(value => {
          console.log('info', value.user.providerId);
          this.router.navigate(['/home']);
        })
        .catch(err => {
          console.log('Something went wrong: ', err.message);
        });
    }
    emailSignup(value) {
      this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
        .then(v => {
          console.log('Sucess', value);
          this.router.navigate(['/home']);
        })
        .catch(error => {
          console.log('Something went wrong: ', error);
        });
    }

    logout() {
      this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
      });
    }
    private oAuthLogin(provider) {
      return this.afAuth.auth.signInWithPopup(provider);
    }

    getToken() {
      return firebase.auth().currentUser.getIdToken();
    }
}
