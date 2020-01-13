import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ServercallService {
  
  constructor(private http:HttpClient) { }
  baseUrl='http://localhost:2020/';
  imageBaseUrl="http://localhost:2020/images/"

  fnSendGetReq(url){
      return this.http.get(this.baseUrl+url);
  }

  fnSendPostReq(url,data){
      return this.http.post(this.baseUrl+url,data);
  }
}
