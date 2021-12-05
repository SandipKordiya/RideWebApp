import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/_modal/user';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  item: any;
  selectedFiles: FileList;
  currentFileUpload: User;
  progress: { percentage: number } = { percentage: 0 };
  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {

  }

  ngOnInit() {
    this.spinner.show();
    this.getData();
    this.spinner.hide();
  }
  getData() {
    this.userService.getuser()
    .subscribe(result => {
      this.item = result.payload.data();
      console.log(this.item);
    });
  }
  selectFile(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }

  upload() {
    this.spinner.show();
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new User(file);
    this.userService.pushFileToStorage(this.item, this.currentFileUpload, this.progress);
    this.router.navigate(['/taxi']);
    this.spinner.hide();
  }


  save() {
    this.userService.updateUser(this.item.id, this.item)
    .then(res => {
      console.log(res);
    }, err => console.log(err));
  }

}
