import { Component, OnInit } from '@angular/core';
import { QuizAppService } from '../service/quiz-app.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
email
password

  constructor(public quizappService : QuizAppService,
    public alert : AlertController,
     public router : Router,
     public toast : ToastController
     ) { }

  ngOnInit() {
  }
  login(){
    this.quizappService.login(this.email,this.password).then(data => {
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
        message: 'user logged in.',
        duration: 5000,
        color: "secondary",
        position: "bottom"
      });
      toast.present();
    }
    

async resetPass(){
  let alert = await this.alert.create({
    header: 'Reset password',
    inputs: [
      {
        name: 'Email',
        type: 'email',
        placeholder: 'Please enter your email!'
      }],
      buttons:[{
        text: 'send',
        handler: (email) =>{
        this.quizappService.resetPass(email)
        console.log('email');
        }
      },{
          text: 'cancel',
          handler: () =>{
            console.log('cancel');
          }
        }]
  });
  await alert.present()
}
}
