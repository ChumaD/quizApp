import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {FormBuilder,FormGroup ,Validator} from '@angular/forms'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import * as firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyDeRtL-dQC_-DdsnAqwMeyV0n0OHgwUvCY",
  authDomain: "chumad-3a58c.firebaseapp.com",
  databaseURL: "https://chumad-3a58c.firebaseio.com",
  projectId: "chumad-3a58c",
  storageBucket: "",
  messagingSenderId: "646774444231",
  appId: "1:646774444231:web:5d2bfeed17556966"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    Camera,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
