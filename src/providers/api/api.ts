import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  constructor(public http: Http) {
    console.log('Hello ApiProvider Provider');
  }


  mailSentCheck(userEmailID): any {
    return new Promise((resolve, reject) => {
      this.http.post("https://us-central1-journal-d6bd7.cloudfunctions.net/MailSentCheck", { emailId: userEmailID })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, function (error) {
          reject(error);
        });
    });
  }
}
