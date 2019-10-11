import { Injectable } from '@angular/core';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class QuizAppService {
  userNamez: any;
  userAge: any;
  userSurname: any;
  usergender: any;
  [x: string]: any;
  userId
  userCat
  userEmail
  quiz =[];
  category=[];
  name
  New_ID
  Counter = 0;
  Questions = [];
  cat_key
  Category_key
  userzArray = [];

 database = firebase.database();
  finalscore: number;
 
constructor() {}

login(email, password){
  return firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
    console.log("result");

      }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    return errorMessage
    // ...
  });
}

register(name,surname,age,gender, email, password){

 return firebase.auth().createUserWithEmailAndPassword( email, password).then((user) => {
  if (user){
    console.log("user is registered");

this.userId = user['user'].uid;
this.userEmail = user['user'].email;
console.log(user['user'].uid);

firebase.database().ref('users/' + this.userId).set({
  username: name,
  emails: this.userEmail,
  surnames:surname,
  ages:age,
  genders:gender
  
},(error) =>{
if(error){
  console.log(error);
}
else {
console.log("data saved");
}
})
}
return user

}).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    return errorMessage
    // ...
  });
}

logout(){
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    console.log("Sign-out successful");
    
  }).catch(function(error) {
    // An error happened.
    console.log(error.code);
  });
}

resetPass(email){
  console.log(email);
  
  var auth = firebase.auth();
  auth.sendPasswordResetEmail(email.Email).then(() => {
    // Email sent.
    console.log("password reset");
    
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    // An error happened.
  });
}

getCat(){
  this.delCat()
var data = firebase.database().ref().child("categories")
   data.on("child_added",snap => {
     this.name = snap.child("catName").val();
     this.cat_key = snap.child("ID").val();
     this.category.push({
       categories: this.name,
       Category_ID: this.cat_key
     })
     console.log(this.name);
     console.log(this.cat_key);
     console.log(this.category);
   })
   return this.category;
}

  delCat(){
    for(let i =0; i<this.category.length; i++){
      this.category.splice(i)
    }
  }

  // setMe(key){
  //   this.Category_key = key
  //  }

  getID(key){
    this.userId = key.ID;
    console.log(this.userId);
   }

   returnID() {
    return this.userId
   }

   delQuiz(){
    for(let q =0; q<this.category.length; q++){
      this.Questions.splice(q)
   }
   }
getQuiz(Unique_ID) {
  this.delQuiz()
   var rootRef = firebase.database().ref('quiz/'+ Unique_ID)
    rootRef.once('value',(snapshot) => {
     let Questions = snapshot.val();
       for(let key in Questions){
         this.Counter++;
         this.Questions.push({
           counter: this.Counter,
           Question: key,
           option: Object.keys(Questions[key]),
           value: Object.values(Questions[key])
         })
         console.log(this.Questions)
       }
     })
       return this.Questions;
    }

submitData(AnswerbyUser, UID, ID, Unique_ID){
 for(var b= 0; b < AnswerbyUser.length; b++)
 {
   firebase.database().ref('results/' + UID + "/" + ID + "/" + Unique_ID + "/" + AnswerbyUser[b].Question).set(
     {
       Answer: AnswerbyUser[b].Answer,
       CorrectAnswer: AnswerbyUser[b].CorrectAnswer,
       Score: AnswerbyUser[b].Score
     }) 
 }
 }

 getuserID()
{
 var user = firebase.auth().currentUser
 var name, email, photoUrl, userid, emailVerified
 if (user != null)
 {
   name = user.displayName
   email = user.email
   userid = user.uid
   
 }
//  console.log(user);
 
 return userid
}

 getUserInfor() {
  this.userId = this.getuserID()
  const rootRef = firebase.database().ref('users/' + this.userId);
  rootRef.on('value', (data) => {
    const userz = data.val();
    this.userNamez = userz.username;
    this.userSurname = userz.surnames;
    this.userAge = userz.ages;
    this.usergender = userz.genders;
    this.userEmail = userz.emails;
 
    this.userzArray.push({
      name: this.userNamez,
      surname: this.userSurname,
      age: this.userAge,
      gender: this.usergender,
      email: this.userEmail
      // userzz
    });
    console.log(this.usergender);
    console.log(this.userzArray);
    console.log(userz);
    // console.log(this.userzArray);
  });
  return this.userzArray;
}

retunID(){
  return this.userId
 }

// score(answer,finalAnswer){
// if(answer==finalAnswer)
// console.log(this.score);

// this.finalscore +=1
// console.log(this.finalscore);

// }
// getScore(){
//   return this.finalscore
// }
}
