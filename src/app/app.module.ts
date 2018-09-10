import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AddJournalPage } from '../pages/add-journal/add-journal';
import { LoadingProvider } from '../providers/loading/loading';
import { Camera } from '@ionic-native/camera';
import { ApiProvider } from '../providers/api/api';
import { FirebaseQueryProvider } from '../providers/firebase-query/firebase-query';
import { SignupPage } from '../pages/signup/signup';
import { IonicStorageModule } from '@ionic/storage';

import { HeaderMenuComponent } from '../components/header-menu/header-menu';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    HeaderMenuComponent,
    SignupPage, 
    AddJournalPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddJournalPage,
    HomePage,
    SignupPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    Camera,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoadingProvider,
    ApiProvider,
    FirebaseQueryProvider
  ]
})
export class AppModule {}
