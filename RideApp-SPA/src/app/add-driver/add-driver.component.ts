import { Component, OnInit } from '@angular/core';
import { DriverService } from '../_services/driver.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {
  model: any = {};
  constructor(private driverService: DriverService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.driverService.createUser(this.model)
    .then(
      res => {
        this.router.navigate(['/drivers']);
      }
    );
  }

}
