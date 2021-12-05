import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  errorMessage = '';
  successMessage = '';
  constructor(public authService: AuthService, private router: Router, private spinner: NgxSpinnerService) {
     }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
        this.spinner.hide();
    }, 1000);
  }

  // createForm() {
  //   this.registerForm = this.fb.group({
  //     email: ['', Validators.required ],
  //     password: ['', Validators.required]
  //   });
  // }


  tryRegister() {
    console.log(this.model);
    this.authService.doRegister(this.model)
    .then(res => {
      this.router.navigate(['/login']);
      console.log(res);
      this.errorMessage = '';
      this.successMessage = '';
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = '';
    });
  }
}
