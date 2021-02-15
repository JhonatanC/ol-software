import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserModel } from 'src/app/models/users.model';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  columnas: string[] = ['name','last_name','dni','rol','status','phone','email','accion'];
  users: UserModel[] = [];
  dataSource = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor( 
    private _auth: AuthService,
    private _users: UsersService ) {
      
    }

  ngOnInit(): void {

    this._users.listUsers().subscribe( (data:any) =>{

      this.users = data;
      this.dataSource = new MatTableDataSource<UserModel>(this.users);
      this.dataSource.paginator = this.paginator;
      console.log(this.users);

    });
  }

  getOut(){
    this._auth.logout();
  }

  deleteUser(id){
    this._users.deleteUser(id).subscribe( (data:any) =>{
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