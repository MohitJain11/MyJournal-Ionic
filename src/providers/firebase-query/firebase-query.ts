import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { resolveDefinition } from '@angular/core/src/view/util';
declare var firebase;
/*
  Generated class for the FirebaseQueryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseQueryProvider {

  constructor(public http: Http) {
    console.log('Hello FirebaseQueryProvider Provider');
  }

  updateOtpSentToUser(otpSentToUserID) {
    var ref = firebase.database().ref('otpSentToUser/' + otpSentToUserID).update({
      sentDate: new Date().getTime()
    })
  }

  checkOtpSentToUser(userEmailId): any {
    var emailId = userEmailId;
    var data = {
      mailExist: false,
      otp: 0,
      otpSentToUserID: "",
      error: ""
    }
    return new Promise((resolve, reject) => {
      var ref = firebase.database().ref('otpSentToUser').orderByChild('userEmailId').equalTo("choudharymonty1109@gmail.com").once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          console.log(childSnapshot.key);
          data.mailExist = true;
          data.otp = childSnapshot.val().otp;
          data.otpSentToUserID = childSnapshot.key;
        })
      }).then(() => {
        resolve(data);
      }).catch((error) => {
        data.error = error;
        reject(data);
      })
    })
  }

  pushOtpSentToUser(userEmailId, otp): any {
    var ref = firebase.database().ref('otpSentToUser').push({
      userEmailId: userEmailId,
      otp: otp,
      sentDate: new Date().getTime()
    })
  }

  signUpInAuth(userEmailId, userDetails): any {
    return new Promise((resolve, reject) => {
      var message;
      firebase.auth().createUserWithEmailAndPassword(userEmailId, userDetails.password).then((data) => {
        console.log('data ' + JSON.stringify(data.user.uid));
        firebase.database().ref('userProfile/' + data.user.uid).set({
          createdDate: new Date().getTime(),
          userName: userDetails.userName,
          userEmailId: userEmailId,
          userProfilePic: ""
        }).then(() => {
          var userDetail = {
            userId: data.user.uid,
            userEmailId: userEmailId,
            userName: userDetails.userName,
            userProfile: ""
          }
          resolve(userDetail);
        }).catch((error) => {
          reject(error);
        })
      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        reject(error.message);
      })
    })
  }

  logIn(userEmailId, password): any {
    return new Promise((resolve, reject) => {
      var message;
      firebase.auth().signInWithEmailAndPassword(userEmailId, password).then((data) => {
        console.log((data.user.uid));
        firebase.database().ref('userProfile').child(data.user.uid).once('value', function (snapshot) {
          var userDetail = {
            userId: data.user.uid,
            userEmailId: userEmailId,
            userName: snapshot.val().userName,
            userProfile: snapshot.val().userProfile
          }
          resolve(userDetail);
        })
      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        reject(error.message);
      })
    })
  }

  addJournal(userId, journalDetail) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('journals/' + userId).push({
        createdDate: new Date().getTime(),
        journalKeywords: journalDetail.journalKeywords,
        journal: journalDetail.journal,
        journalEmotion: journalDetail.journalEmotion,
        journalRank: journalDetail.journalRank
      }).then((data)=>{
        resolve(data);
      }).catch((error) => {
        reject(error);
      })
    })
  }
}
