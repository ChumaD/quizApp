import { Component, OnInit } from '@angular/core';
import { QuizAppService } from '../service/quiz-app.service';
import * as firebase from 'firebase'
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {
  Userid
  cat_key
  play
  Questions =[]; 
  scoreBoolean
  quest
  correctAnswer
  gamescore
  ID 
  Unique_ID
  Quizz = [];

  user = firebase.auth().currentUser;
  uid;
  index

constructor(public route: ActivatedRoute ,public quizappService : QuizAppService, public loaderControler : LoadingController) {
  this.Unique_ID = this.route.snapshot.paramMap.get('ID')
  console.log(this.Unique_ID);
  
  // this.cat_key = this.quizappService.retunID();
  this.Questions = this.quizappService.getQuiz(this.Unique_ID);
  
  console.log(this.Questions);
  console.log(this.Unique_ID);
   }

getAnswer(key){
   this.quizappService.setMe(key);
   }

quizIt(event){
    this.play = event.detail.value 
    console.log(this.play); 
}
  ngOnInit() {
  }

pushToQuizz(Question, Answer, correctAnswer, scoreBoolean) {
    this.Quizz.push({
      gameQuestions: Question,
      Answer: Answer,
      correctAnswer: correctAnswer, 
      scoreBoolean: scoreBoolean 
    }); 
    console.log(this.Quizz);
    
  }

Score(event, Question) {
    const question: string = Question;
    const Answer: string = event.detail.value;
    console.log(question);
    console.log(Answer);

    if (this.Questions.length >= 1) {
      // console.log(this.Questions);
      console.log(question);
      for (let i = 0; i < this.Questions.length; i++) {
        // console.log(i);
        if (this.Questions[i].Question === Question) {
          for (let n = 0; n < this.Questions[i].option.length; n++) {
            // console.log(this.Questions[i].value[n]);
            if (this.Questions[i].value[n]) {
              // console.log(this.Questions[i].Answer[n]);
              this.correctAnswer = this.Questions[i].option[n];
              // console.log(this.correctAnswer);
            }
          }
        }
      }
    }
    if (this.correctAnswer === Answer) {
      this.scoreBoolean = true;
      console.log(this.scoreBoolean);
      console.log("correct answer");
    }
    if (this.correctAnswer !== Answer) {
      this.scoreBoolean = false;
      console.log("wrong answer");
    }

    if (this.Quizz.length === 0) {
      console.log(Question);
      console.log(Answer);
      console.log(this.correctAnswer);
      console.log(this.scoreBoolean);
      
      this.pushToQuizz(Question, Answer, this.correctAnswer, this.scoreBoolean);
      console.log('pushed to array successfully');
  
    } else if (this.Quizz.length > 0) {
      
      for (let i = 0; i < this.Quizz.length; i++) {
        
        if (this.Quizz[i].gameQuestions === question) {
          console.log('Question has a match in game array');
          this.index = this.Quizz.indexOf(this.Quizz[i]);
          console.log(this.index);
        } else { 
          this.index = null;
        }
      }

      if (this.index != null) {
        console.log(this.index);
        this.Quizz[this.index].Answer = Answer;
        this.Quizz[this.index].scoreBoolean = this.scoreBoolean;
        console.log(Answer);
      } else if (this.index === null) {
        this.pushToQuizz(Question, Answer, this.correctAnswer, this.scoreBoolean);
      }
    }
    console.log(this.Quizz);
    console.log(this.index);

    // getting user infor
    if (this.user != null) {
      this.uid = this.user.uid;
      console.log(this.uid);
    }
  }

submit() {
    if (this.Quizz) {
      console.log(this.Quizz);
      for (let i = 0; i < this.Quizz.length; i++) {
        if (this.Quizz[i].scoreBoolean === true) {
          this.gamescore++;
        }
      }
      console.log(this.gamescore);
    }
    this.submitFirebase();
  }

submitFirebase() {
    console.log(this.Quizz);
    let newPostKey = firebase.database().ref().child('results/' + this.uid + '/').push().key;
    console.log(newPostKey);
    for (let i = 0; i < this.Quizz.length; i++) {
      firebase.database().ref('results/' + '/' + this.uid + '/' + this.ID + '/' + newPostKey + '/' + this.Quizz[i].gameQuestions).set({
        userAnswer: this.Quizz[i].correctAnswer,
        userBooleanScore: this.Quizz[i].scoreBoolean
      });
      console.log(this.Userid );
    }
    firebase.database().ref().child('scores/' + this.uid + '/' + newPostKey + '/' + this.ID + '/' ).update({
      usersScore: this.gamescore
      });
    console.log("Done Everything");
  }


// submit(){
//   this.quizappService.submitData(this.correctAnswer,this.UID,this.ID,this.Unique_ID)
// }

// async showloader(){
  
//   const loader = await this.loaderControler.create({
//     message: "loading"
//   });
//  return await loader.present();
// }
}