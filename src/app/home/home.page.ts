import { Component } from '@angular/core';
import { QuizAppService } from '../service/quiz-app.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public quizappServise : QuizAppService) {}

logout(){
this.quizappServise.logout()
}



}
