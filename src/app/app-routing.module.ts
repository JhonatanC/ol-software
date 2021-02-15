import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'roles', component: DashboardComponent, canActivate: [ AuthGuard ] },
  { path: 'create-user', component: CreateUserComponent, canActivate: [ AuthGuard ] },
  { path: 'login', component: LoginComponent },
  // Ruta por defecto
  { path: '**',   redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }