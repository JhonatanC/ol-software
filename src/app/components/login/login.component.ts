import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/users.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  user: UserModel;

  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router ) {

    this.createForm();
  }

  ngOnInit(): void {
  }

  get emailValidate() {
    return this.form.get('email').invalid && this.form.get('email').touched
  }

  get passwordValidate() {
    return this.form.get('password').invalid && this.form.get('password').touched
  }

  createForm() {
    this.form = this.fb.group({
      email  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      password  : ['',Validators.required]
    });
  }

  login(){

    this.user = this.form.value;

    if ( this.form.invalid ) {

      return Object.values( this.form.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
     
    }

    this._auth.login(this.user).subscribe( (data:any) =>{
      console.log(data);
      this._router.navigate(['/roles']);
    }, (error) =>{
      console.log(error);
    });
  }

}
