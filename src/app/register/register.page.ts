import { Component, OnInit } from '@angular/core';
import { QuizAppService } from '../service/quiz-app.service';
import {FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
name 
surname
age
gender
email
password
quizForm

  constructor(public quizappService : QuizAppService,
    //  public formBuilder : FormBuilder, 
     public router : Router,
      public alert: AlertController,
      public toast: ToastController ) {

    // this.quizForm = formBuilder.group({
    //   name: ["", Validators.required],
    //   surname: ["", Validators.required],
    //   age: ["", Validators.required],
    //   gender: ["",Validators.required],
    //   email: ["", [Validators.required, Validators.email]],
    //   password: ["", [Validators.required, Validators.minLength(8)]]
    // })
   }

  ngOnInit() {
  }
  register(){
  this.quizappService.register(this.name,
    this.surname,
    this.age,this.gender,
    this.email,
    this.password).then(data => {
    console.log(data);
    
    if(data.operationType == "signIn"){
      this.router.navigate(['/home'])
      this.presentToast();
    } else {
      this.presentAlert(data);
    }
  })
  
  }
  async presentAlert(data) {
    const alert = await this.alert.create({
      header: 'Alert',
      message: data,
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentToast() {
    const toast = await this.toast.create({
      message: 'You have been saved.',
      duration: 5000,
      color: "secondary",
      position: "bottom"

    });
    toast.present();
  }
  getGender(event)
 {
   this.gender = event.detail.value
   console.log(this.gender)
 }
  }

