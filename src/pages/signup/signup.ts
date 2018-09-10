import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { LoadingProvider } from '../../providers/loading/loading';
import { FirebaseQueryProvider} from '../../providers/firebase-query/firebase-query';
import { AddJournalPage } from '../add-journal/add-journal';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { global } from '../../providers/global/global';
declare var firebase;

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  private signup : FormGroup;
  userProfilePic: string = 'assets/imgs/default-user.png';
  public userEmailId;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public loading: LoadingProvider,
   public storage: Storage,
   public queryProvider: FirebaseQueryProvider,
   public camera: Camera,
   public actionSheetCtrl: ActionSheetController,
   private formBuilder: FormBuilder) {
    this.userEmailId = this.navParams.data.userEmailId;
    console.log(this.userEmailId);
    this.signup = formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      userName: ['']
    });
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Profile Picture',
      buttons: [
        {
          text: 'Upload from Gallery',
          handler: () => {
            this.gallaryUpload();
          }
        },
        {
          text: 'Capture from Camera',
          handler: () => {
            this.cameraUpload();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  gallaryUpload() {
    const filename = Math.floor((new Date().getTime()) / 1000);
    var me = this;
    me.camera.getPicture({
      sourceType: me.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: me.camera.DestinationType.DATA_URL,
      quality: 50,
      correctOrientation: true,
      targetWidth: 400,
      targetHeight: 400
    }).then((imageData) => {
      me.userProfilePic = "data:image/jpg;base64," + imageData;
      me.loading.startLoading();
      var uploadTask = firebase.storage().ref().child(`${filename}.jpg`).putString(imageData, "base64");
      uploadTask.on('state_changed', function (snapshot) {
        me.loading.closeLoading();
      }, function (error) {
        me.loading.closeLoading();
        alert(JSON.stringify(error));
      }, function () {
        me.loading.closeLoading();
        this.userProfilePic= uploadTask.snapshot.downloadURL;
      });
    }, (err) => {
      me.loading.closeLoading();
      console.log(err);
    });
  }

  cameraUpload() {
    const filename = Math.floor((new Date().getTime()) / 1000);
    var me = this;
    me.camera.getPicture({
      quality: 50,
      correctOrientation: true,
      destinationType: me.camera.DestinationType.DATA_URL,
      encodingType: me.camera.EncodingType.JPEG,
      mediaType: me.camera.MediaType.PICTURE,
      targetWidth: 400,
      targetHeight: 400
    }).then((imageData) => {
      me.userProfilePic = "data:image/jpg;base64," + imageData;
      me.loading.startLoading();
      var uploadTask = firebase.storage().ref().child(`${filename}.jpg`).putString(imageData, "base64");
      uploadTask.on('state_changed', function (snapshot) {
        me.loading.closeLoading();
      }, function (error) {
        me.loading.closeLoading();
        alert(JSON.stringify(error));
      }, function () {
        me.loading.closeLoading();
        this.userProfilePic= uploadTask.snapshot.downloadURL;
      });
    }, (err) => {
      me.loading.closeLoading();
      console.log(err);
    });
  }

  signupFunc(userDetails){
    this.queryProvider.signUpInAuth(this.userEmailId, userDetails).then((userDetail)=>{
      this.storage.set('userId', userDetail.userId);
      global.userId = userDetail.userId,
      global.userEmailId = userDetail.userEmailId,
      global.userName = userDetail.userName,
      global.userProfilePic = userDetail.userProfilePic,
      this.navCtrl.push(HomePage,{userDetail: userDetail});
    }).catch((error)=>{
      console.log(error);
    })
  }

}
