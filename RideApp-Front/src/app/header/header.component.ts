import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AuthInfo } from '../_modal/auth-info';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;
  authInfo: AuthInfo;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.authInfo$.subscribe(authInfo =>  this.authInfo = authInfo);
  }

  logout() {
    this.authService.logout();
  }

}
