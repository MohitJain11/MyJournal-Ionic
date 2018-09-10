import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { global } from '../../providers/global/global';
import { FirebaseQueryProvider } from '../../providers/firebase-query/firebase-query';
/**
 * Generated class for the AddJournalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-journal',
  templateUrl: 'add-journal.html',
})
export class AddJournalPage {
  private attachEmotion = "";
  private journalRank = 0;
  private userId;
  private addJournalForm: FormGroup;
  constructor(public navCtrl: NavController,
    public queryProvider: FirebaseQueryProvider,
    public navParams: NavParams,
    private formBuilder: FormBuilder) {
    this.addJournalForm = formBuilder.group({
      keywords: [''],
      todayJournal: ['']
    });
    this.userId = global.userId;
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddJournalPage');
  }

  addJournal(journal){
    var journalDetail = {
      journalKeywords: journal.keywords,
        journal: journal.todayJournal,
        journalEmotion: this.attachEmotion,
        journalRank: this.journalRank
    }
    console.log(journalDetail);
    this.queryProvider.addJournal(this.userId,journalDetail).then(()=>{
      this.navCtrl.pop();
    }).catch((error)=>{
      console.log('error in adding journal '+error);
    })

  }
  userProfile(attachEmotion){
    this.attachEmotion = attachEmotion;
  }

}
