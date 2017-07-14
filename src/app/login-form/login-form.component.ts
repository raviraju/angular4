import { Component }    from '@angular/core';
import { User }         from '../user';
import { AuthService }  from '../services/auth.service';
import { Router }       from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [AuthService]
})
export class LoginFormComponent {

  user : User;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) { 
    this.user = new User("", "", "");
  }

  onSubmit() {     
    console.log("Validating User : " + this.user.emailId);
    this.authService.login(this.user.emailId, this.user.password).then(
      userObj => {
          console.log(userObj);
          let uname = userObj['uname'];
          console.log("UserName : " + uname);
          if(uname == "unknown")
            alert("Invalid Login Credentials");
          else{
            this.router.navigate(['/dashboard', uname]);
            document.getElementById('navbar').style.visibility = "hidden";
          }
      },
      error =>  this.errorMessage = <any>error
      );
  }

  /*get diagnostic() { return JSON.stringify(this.user) } ;*/

}
