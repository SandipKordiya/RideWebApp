import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  errorMessage = '';
  constructor(
    public authService: AuthService,
    private router: Router, private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
        this.spinner.hide();
    }, 1000);
  }

  tryLogin() {
    this.spinner.show();
    this.authService.doLogin(this.model.email, this.model.password)
    .subscribe(res => {
      this.router.navigate(['/user']);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.errorMessage = err.message;
    });
  }
}
