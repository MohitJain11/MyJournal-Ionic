import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseQueryProvider } from '../../providers/firebase-query/firebase-query';
import { EmailPage } from '../email/email';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { global } from '../../providers/global/global';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private login: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public queryProvider: FirebaseQueryProvider,
    public storage: Storage,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder) {

    this.login = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginForm(loginForm) {
    this.queryProvider.logIn(loginForm.email, loginForm.password).then((userDetail)=>{
      this.storage.set('userId', userDetail.userId);
      global.userId = userDetail.userId,
      global.userEmailId = userDetail.userEmailId,
      global.userName = userDetail.userName,
      global.userProfilePic = userDetail.userProfilePic
      this.navCtrl.setRoot(HomePage,{userDetail: userDetail});
      //this.navCtrl.push(HomePage,{userDetail: userDetail});
    }).catch((error)=>{
      console.log(error);
    })
  }

  signUp() {
    this.navCtrl.push('EmailPage');
  }
  forgotPassword() {

  }

}
