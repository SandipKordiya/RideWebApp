import { Component, OnInit } from '@angular/core';
import { TaxiService } from '../_services/taxi.service';
import { Router } from '@angular/router';
import { Taxi } from '../_modals/taxi';

@Component({
  selector: 'app-add-taxi',
  templateUrl: './add-taxi.component.html',
  styleUrls: ['./add-taxi.component.css']
})
export class AddTaxiComponent implements OnInit {

  model: any = {};
  selectedFiles: FileList;
  currentFileUpload: Taxi;
  progress: { percentage: number } = { percentage: 0 };
  constructor(private taxiService: TaxiService, private router: Router) { }


  ngOnInit() {
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
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new Taxi(file);
    this.taxiService.pushFileToStorage(this.model, this.currentFileUpload, this.progress);
    this.router.navigate(['/taxi']);
  }

}
