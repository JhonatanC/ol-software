import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UserModel } from 'src/app/models/users.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  form: FormGroup;
  user: UserModel;

  constructor( 
    private fb: FormBuilder,
    private _auth: AuthService,
    private _users: UsersService ) {

      this.createForm();

    }

  ngOnInit(): void {
    
  }

  get nameValidate() {
    return this.form.get('name').invalid && this.form.get('name').touched
  }

  get lastNameValidate() {
    return this.form.get('last_name').invalid && this.form.get('last_name').touched
  }

  get dniValidate() {
    return this.form.get('dni').invalid && this.form.get('dni').touched
  }

  get rolValidate() {
    return this.form.get('rol').invalid && this.form.get('rol').touched
  }

  get statusValidate() {
    return this.form.get('status').invalid && this.form.get('status').touched
  }

  get phoneValidate() {
    return this.form.get('phone').invalid && this.form.get('phone').touched
  }

  get emailValidate() {
    return this.form.get('email').invalid && this.form.get('email').touched
  }

  get passwordValidate() {
    return this.form.get('password').invalid && this.form.get('password').touched
  }

  createForm() {
    this.form = this.fb.group({
      id: '',
      name: ['',Validators.required],
      last_name: ['',Validators.required],
      dni: ['',Validators.required],
      rol: ['',Validators.required],
      status: ['',Validators.required],
      phone: ['',Validators.required],
      email  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      password  : ['',Validators.required]
    });
  }

  register(){

    this.user = this.form.value;
    // console.log(this.user);

    if ( this.form.invalid ) {

      return Object.values( this.form.controls ).forEach( control => {
        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      
      });
     
    }


    // this._users.createUser(this.user).subscribe( (data:any) =>{
    //   console.log(data);
    //   this.user = data;
    // });

    this._auth.register(this.user).subscribe( (data:any) =>{
      console.log(data);
    }, (error) =>{
      console.log(error.error.error.message);
    });

  }

}
