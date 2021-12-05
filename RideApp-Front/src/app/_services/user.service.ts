import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '../_modal/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  tokenid: any;
  private basePath = '/Taxi';
 user: any;
  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
  }

  pushFileToStorage(user: User, fileUpload: User, progress: { percentage: number }) {
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
          user.url = downloadURL;
          user.imagename = fileUpload.file.name;
          console.log('users 2 =', user);
          this.db.collection('users').doc(user.uid).set({
            firstname: user.firstname,
            email: user.email,
            phone: user.phone,
            status: user.status,
            url: user.url,
            imagename: user.imagename
          });
        });
      }
    );
  }


  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      this.user = firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          this.tokenid = user.uid;
          resolve(user);
          console.log('uid',  this.tokenid);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  updateCurrentUser(name) {
    return new Promise<any>((resolve, reject) => {
      this.user = firebase.auth().currentUser;
      this.user.updateProfile({
        displayName: name,
        photoURL: this.user.photoURL
      }).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  updateUser(userKey, value) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('users').doc(userKey).set(value);
  }

  getuser() {
    const items = this.db.collection('users').doc(localStorage.getItem('uid')).snapshotChanges();
    console.log(localStorage.getItem('uid'), items);
    return items;
  }
}
