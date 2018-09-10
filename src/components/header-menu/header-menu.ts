import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../../pages/login/login';

/**
 * Generated class for the HeaderMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header-menu',
  templateUrl: 'header-menu.html'
})
export class HeaderMenuComponent {

  text: string;

  constructor(public navCtrl: NavController, public storage: Storage) {
    console.log('Hello HeaderMenuComponent Component');
    this.text = 'Hello World';
  }

  logout(){
    this.storage.remove('userId').then(() => { 
      this.navCtrl.push(LoginPage);
    })
  }

}
