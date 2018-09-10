import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddJournalPage } from './add-journal';

@NgModule({
  declarations: [
    AddJournalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddJournalPage),
  ],
})
export class AddJournalPageModule {}
