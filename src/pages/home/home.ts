import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddJournalPage } from '../add-journal/add-journal';
import { Storage } from '@ionic/storage';
import { global } from '../../providers/global/global';
import { LoginPage } from '../login/login';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    public storage: Storage) {

  }

  userProfile(){
    console.log('profile');
  }
  addJournal(){
    this.navCtrl.push(AddJournalPage);
  }
  
}
