import { Component, OnInit  } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthInfo } from './_modal/auth-info';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  user: any;
  authInfo: AuthInfo;
  constructor(private authService: AuthService, private afAuth: AngularFireAuth) {
   }

   ngOnInit() {
    this.authService.authInfo$.subscribe(authInfo =>  this.authInfo = authInfo);
  }
}
