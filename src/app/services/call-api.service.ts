import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CallApiService {

  constructor(private _http:HttpClient) { }


  callApi(code:string){
   return this._http.get('http://testcode.sebdevlab.com?code=' + code)
  }

}
