import { Component, OnInit } from '@angular/core';
import { TaxiService } from '../_services/taxi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-taxi',
  templateUrl: './list-taxi.component.html',
  styleUrls: ['./list-taxi.component.css']
})
export class ListTaxiComponent implements OnInit {

  items: Array<any>;
  constructor(private taxiService: TaxiService, private router: Router) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.taxiService.getTaxi()
    .subscribe(result => {
      this.items = result;
    });
  }

}
