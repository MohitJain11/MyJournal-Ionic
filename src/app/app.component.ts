import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { EmailPage } from '../pages/email/email';
import { Storage } from '@ionic/storage';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { global } from '../providers/global/global';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public storage: Storage) {
    this.loadPage();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  loadPage() {
    this.storage.get('userId').then((userId) => {
      console.log('user id ' + userId);
      if (userId != null) {
        console.log('user id ' + userId);
        console.log('HomePage');
        //this.rootPage = HomePage;
        this.nav.setRoot('HomePage');
      }
      else {
        console.log('LoginPage');
        //this.rootPage = LoginPage;
        this.nav.setRoot('LoginPage');
      }
    });
  }

  openHome() {
    console.log('openHome');
  }
  openProfile() {
    console.log('openProfile');
  }
  logout() {
    console.log('logOut');

    this.storage.remove('userId').then(() => {
      //this.rootPage = LoginPage;
      this.nav.setRoot('LoginPage');
    })

  }
}

