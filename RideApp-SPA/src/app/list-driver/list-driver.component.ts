import { Component, OnInit } from '@angular/core';
import { DriverService } from '../_services/driver.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-driver',
  templateUrl: './list-driver.component.html',
  styleUrls: ['./list-driver.component.css']
})
export class ListDriverComponent implements OnInit {
  items: Array<any>;
  constructor(private driverService: DriverService, private router: Router) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.driverService.getUsers()
    .subscribe(result => {
      this.items = result;
    });
  }

  viewDetails(item) {
    this.router.navigate(['/details/' + item.payload.doc.id]);
  }

  delete(item) {
    this.driverService.delete(item.payload.doc.id);
    this.router.navigate(['/drivers']);
  }

}
