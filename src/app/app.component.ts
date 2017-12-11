import { CallApiService } from './services/call-api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private _api:CallApiService){

  }

  testCode(code:string){
    this._api.callApi(code).subscribe(res$ => {});
  }

}
