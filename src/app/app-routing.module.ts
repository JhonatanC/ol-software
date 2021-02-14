import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'create-user', component: CreateUserComponent },
  { path: 'login', component: LoginComponent },
  // Ruta por defecto
  { path: '**',   redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }