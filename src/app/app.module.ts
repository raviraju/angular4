import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { FormsModule }          from '@angular/forms';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockData }             from './mock-data';
import { HttpModule }           from '@angular/http';

import { AppComponent }         from './app.component';
import { LoginFormComponent }   from './login-form/login-form.component';
import { SignupFormComponent }  from './signup-form/signup-form.component';

import { AppRoutingModule }     from './routing/routing.module';
import { DashboardComponent }   from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    SignupFormComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule/*,
    InMemoryWebApiModule.forRoot(MockData)*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
