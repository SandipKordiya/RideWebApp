import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import {tap, take, map} from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.authInfo$.pipe(
        map(authInfo => authInfo.isLoggedIn()),
        take(1),
        tap(allowed => {
            if (!allowed) {
                this.router.navigate(['/login']);
            }
        }));
}
}
