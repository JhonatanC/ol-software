import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/users.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url:string = 'https://ol-software-cee51-default-rtdb.firebaseio.com';

  constructor(private _http: HttpClient) {}

  private createArrayUsers( usersObj: object ){
    const users: UserModel[] = []

    if(usersObj === null){ return []; }

    Object.keys( usersObj ).forEach( (key) =>{
      const user: UserModel = usersObj[key];
      user.id = key;

      users.push(user);
    });

    return users;


  }

  createUser( user: UserModel ){
    return this._http.post(`${this.url}/users.json`, user).pipe(
      map( (resp:any) => {
        user.id = resp.name;
        return user;
      })
    )
  }

  listUsers(){
    return this._http.get(`${this.url}/users.json`).pipe(
      map( this.createArrayUsers )
    );
  }

  viewUser(id:string){
    return this._http.get(`${this.url}/${id}`);
  }

  updateUser( user: UserModel ){
    const userDB = {
      ...user
    };

    delete userDB.id;
    return this._http.put(`${this.url}users/${user.id}.json`, userDB);
  }

  deleteUser(id){
    return this._http.delete(`${this.url}users/${id}.json`);
  }

}
