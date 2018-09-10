import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseQueryProvider } from '../../providers/firebase-query/firebase-query';
import { SignupPage } from '../signup/signup';

declare var firebase;
declare var Email;

@IonicPage()
@Component({
  selector: 'page-email',
  templateUrl: 'email.html',
})
export class EmailPage {
  private sendEmailButton = true;
  private otpGenerator;
  private emailSend: FormGroup;
  private verifyEmail: FormGroup;
  public userEmailId = "choudharymohit1109@gmail.com";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private queryProvider: FirebaseQueryProvider,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder) {
    this.emailSend = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
    this.verifyEmail = formBuilder.group({
      otp: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailPage');
  }
  sendEmail(emailIdValue) {
    var me = this;
    this.sendEmailButton = false;
    this.userEmailId = emailIdValue.email;
    this.queryProvider.checkOtpSentToUser(emailIdValue.email).then((data) => {
      console.log('data '+JSON.stringify(data));
      if (data.mailExist) {
        this.otpGenerator = data.otp;
        //this.elasticMailService(emailIdValue);
        this.queryProvider.updateOtpSentToUser(data.otpSentToUserID);
      }
      else{
        this.otpGenerator = (new Date().getTime()) % 1000000;
       // this.elasticMailService(emailIdValue);
        this.queryProvider.pushOtpSentToUser(emailIdValue.email,this.otpGenerator);
      }



    }).catch((error) => {
      console.log('error in api ' + error);
    });



  }

  elasticMailService(emailIdValue) {
    var me = this;
    Email.send("choudharymohit1109@gmail.com",
      emailIdValue.email,
      "MyJournal email verified process",
      "Your email " + emailIdValue.email + " verification OTP is " + this.otpGenerator,
      "smtp.elasticemail.com",
      "choudharymohit1109@gmail.com",
      "3849787c-c77e-48d8-b3be-1a8675799b58");
    console.log('emailId ' + emailIdValue.email)
    setTimeout(function () {
      me.sendEmailButton = true;
    }, 30000);
    this.changeDetector.detectChanges();
  }

  verifyOtp(otpValue) {
    if (otpValue.otp == 627289)  //this.otpGenerator)
    {
      console.log('this.use '+this.userEmailId);
      this.navCtrl.push(SignupPage, { userEmailId : this.userEmailId});
    }
    else{
      console.log('Invalid Otp');
    }
  }

}
