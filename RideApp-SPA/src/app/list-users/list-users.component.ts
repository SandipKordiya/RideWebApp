import { Component, OnInit } from '@angular/core';
import { UsersService } from '../_services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  items: Array<any>;
  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.userService.getall()
    .subscribe(result => {
      this.items = result;
    });
  }

}
