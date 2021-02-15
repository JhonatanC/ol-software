import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private _auth: AuthService, private _router: Router ){
    
  }

  canActivate(){
    if( this._auth.IsAuthenticated() ){
      return true;
    } else {
      this._router.navigateByUrl('/login');
      return false;
    }
  }
  
}
