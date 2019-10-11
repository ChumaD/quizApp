import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { QuizAppService } from '../service/quiz-app.service';
import {Router} from '@angular/router'
import * as firebase from 'firebase'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
profilePic
ID;
userId;
name;
email;
uid;
users;
used = [];

  constructor(public camera:Camera,public quizappService: QuizAppService,private router: Router ) { 

    this.used = this.quizappService.getUserInfor();
    // getting user Auth
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.ID = user.uid;
        console.log(this.ID);
      } else {
        // No user is signed in.
        // this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
  }

takePicture(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  
  this.camera.getPicture(options).then((imageData) => {
   // imageData is either a base64 encoded string or a file URI
   // If it's base64 (DATA_URL):
   
   this.profilePic = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {
   // Handle error
   console.log("camera issues: " + err);
   
  });
}



}
