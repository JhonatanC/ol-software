import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/users.model';

import { map } from 'rxjs/operators' ;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private apiKey = 'AIzaSyCZj4Joa43AjtfKdSmND3eAzqu5M31FmAY';
  userToken:string;

  // Crear usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

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

  register(user: UserModel){
    const authData = {
      ...user,
      returnSecureToken: true
    };

    return this._http.post(`${this.url}:signUp?key=${this.apiKey}`, authData).pipe(
      map( resp => {
        this.saveToken( resp['idToken'] );
        return resp;
      })
    )
  }

  login(user: UserModel){
    const authData = {
      ...user,
      returnSecureToken: true
    };

    return this._http.post(`${this.url}:signInWithPassword?key=${this.apiKey}`, authData).pipe(
      map( resp => {
        this.saveToken( resp['idToken'] );
        return resp;
      })
    );
  }

  logout(){
    localStorage.removeItem('token');
  }


}
