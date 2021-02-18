import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/users.model';

import { map } from 'rxjs/operators' ;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string = 'http://olsoftware.develop/api';

  userToken:string;

  constructor( private _http: HttpClient ) {
    this.readToken();
  }

  private saveToken(idToken:string){
    this.userToken = idToken;
    localStorage.setItem('token',idToken)
  }

  IsAuthenticated(){
    return this.userToken.length > 2;
  }

  readToken(){
    if( localStorage.getItem('token') ){
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }


  login(user: UserModel){
    const authData = {
      email: user.email,
      password: user.password,
      remember_me: true
    };

    return this._http.post(`${this.url}/login`, authData).pipe(
      map( resp => {
        this.saveToken( resp['access_token'] );
        return resp;
      })
    );
  }

  logout(){
    localStorage.removeItem('token');
  }


}
