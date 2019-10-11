import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import { QuizAppService } from '../service/quiz-app.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
scores

  constructor(public quizappService : QuizAppService) {
//  this.scores = this.quizappService.getScore()
   }

 getscor(){
   this.quizappService.finalscore
   
 }
  ngOnInit() {
  }

}
