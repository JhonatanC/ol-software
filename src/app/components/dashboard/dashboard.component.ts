import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserModel } from 'src/app/models/users.model';
import { UsersService } from 'src/app/services/users.service';

import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  form: FormGroup;
  roles:any = [];
  status:any = [];

  columnas: string[] = ['name','last_name','dni','rol','status','phone','email','accion'];
  users: UserModel[] = [];
  dataSource = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor( 
    private _auth: AuthService,
    private _users: UsersService,
    private fb: FormBuilder ) {
      this.createForm();
    }

    createForm() {
      this.form = this.fb.group({
        name  : '',
        last_name  : '',
        dni  : '',
        rol_id  : '',
        status  : '',
        phone  : '',
        email  : '',
        password  : '',
      });
    }

  ngOnInit(): void {
    this.listUsers();
    this._users.roles().subscribe((data:any)=>{
      console.log(data);
      this.roles = data;
    });
    this._users.status().subscribe((data:any)=>{
      console.log(data);
      this.status = data;
    });
  }

  listUsers(){
    this._users.filter(this.form.value).subscribe( (data:any) =>{
      console.log(data);
      this.users = data;
      this.dataSource = new MatTableDataSource<UserModel>(this.users);
      this.dataSource.paginator = this.paginator;
    });
  }

  filterData(){
    console.log(this.form.value);
    this._users.filter(this.form.value).subscribe( (data:any) =>{
      this.users = data;
      this.dataSource = new MatTableDataSource<UserModel>(this.users);
      this.dataSource.paginator = this.paginator;
    });
  }

  clearForm(){
    let clear = this.form.reset({
        name  : '',
        last_name  : '',
        dni  : '',
        rol_id  : '',
        status  : '',
        phone  : '',
        email  : '',
        password  : '',
    });
    this._users.filter(clear).subscribe( (data:any) =>{
      this.users = data;
      this.dataSource = new MatTableDataSource<UserModel>(this.users);
      this.dataSource.paginator = this.paginator;
    });
  }

  getOut(){
    this._auth.logout();
  }

  delete(id){
    this._users.delete(id).subscribe( (data:any) =>{
      this.listUsers();
      console.log(data);
    });
  }


}


export class User{
  constructor(
    public name:string,
    public last_name:string,
    public dni:number,
    public rol:string,
    public status:string,
    public phone:number,
    public email:string
    ) {

  }
}