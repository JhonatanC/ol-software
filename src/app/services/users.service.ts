import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/users.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url:string = 'http://olsoftware.develop/api';

  constructor(private _http: HttpClient) {}

  // index(){
  //   const headers = new HttpHeaders({
  //     'Authorization':'Bearer ' + localStorage.getItem('token')
  //   });
  //   return this._http.get(`${this.url}/users`,{headers: headers});
  // }

  filter(data){
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer ' + localStorage.getItem('token')
    });
    return this._http.post(`${this.url}/filter`, data,{headers: headers});
  }

  show(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('token')
    });
    return this._http.get(`${this.url}/users/${id}`,{headers: headers});
  }

  store(user: UserModel){
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer ' + localStorage.getItem('token')
    });
    return this._http.post(`${this.url}/users`, user,{headers: headers});
  }

  update(user: UserModel){
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer ' + localStorage.getItem('token')
    });
    return this._http.put(`${this.url}/users/${user.id}`, user,{headers: headers});
  }

  delete(id:number){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('token')
    });
    return this._http.delete(`${this.url}/users/${id}`,{headers: headers});
  }

  roles(){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('token')
    });
    return this._http.get(`${this.url}/roles`,{headers: headers});    
  }

  status(){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('token')
    });
    return this._http.get(`${this.url}/status`,{headers: headers});    
  }

}
