import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent }   from '../login-form/login-form.component';
import { SignupFormComponent }  from '../signup-form/signup-form.component';
import { DashboardComponent }   from '../dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login',  component: LoginFormComponent },
  { path: 'signup', component: SignupFormComponent },
  { path: 'dashboard/:uname', component: DashboardComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
