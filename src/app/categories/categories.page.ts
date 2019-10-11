import { Component, OnInit } from '@angular/core';
import { QuizAppService } from '../service/quiz-app.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
category =[];

constructor(public quizappService : QuizAppService) {
  this.category = this.quizappService.getCat()
  console.log(this.category);
   }


// setID(categ) {
//   this.quizappService.getCat()
// }

// getQuiz(key){
//   this.quizappService.setMe(key);
// }

  ngOnInit() {
  }

  setID(key){
    this.quizappService.getID(key);
    
  }

}
