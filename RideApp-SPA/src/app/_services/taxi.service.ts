import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Taxi } from '../_modals/taxi';

@Injectable({
  providedIn: 'root'
})
export class TaxiService {
  private basePath = '/Taxi';
  constructor(public db: AngularFirestore, private router: Router) {}

  pushFileToStorage(taxi: Taxi, fileUpload: Taxi, progress: { percentage: number }) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL);
          taxi.url = downloadURL;
          taxi.name = fileUpload.file.name;
          console.log('taxi 2 =', taxi);
          this.db.collection('taxis').add({
            model: taxi.model,
            number: taxi.number,
            driver: taxi.driver,
            status: taxi.status,
            url: taxi.url,
            name: taxi.name
          });
        });
      }
    );
  }
  // private saveFileData(value: Taxi) {
  //   // this.db.collection(`${this.basePath}/`).p(fileUpload);
  //   return
  // }

  getall() {
    return this.db.collection('taxis').valueChanges();
  }
  get(userKey) {
    return this.db.collection('taxis').doc(userKey).snapshotChanges();
  }

  getTaxi() {
    return this.db.collection('taxis').snapshotChanges();
  }

  create(value) {
    return this.db.collection('taxis').add({
      name: value.name,
      phone: value.phone,
      address: value.address,
      email: value.email,
      drivingId: value.drivingId
    });
  }

  update(userKey, value) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('taxis').doc(userKey).set(value);
  }

  delete(Key) {
    return this.db.collection('taxis').doc(Key).delete();
  }

}
