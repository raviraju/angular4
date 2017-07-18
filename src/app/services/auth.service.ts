import { Injectable }       from '@angular/core';
import { Http, Response }   from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { User }             from '../user';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  // URL to web api
  private mockDataUrl = 'app/mockData';

  constructor (private http: Http) {}

  //login(emailId, pwd):Promise<String>{
    // if(emailId == "admin@scry.com" && pwd == "admin")
    //   return Promise.resolve("Adminstrator");
    // else
    //   return Promise.resolve("Unknown");
  //}

  login(emailId, pwd):Promise<User[]>{
    let authUrl = 'http://localhost:4200/api/auth';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    console.log("To invoke post request : " + authUrl);
    return this.http.post(authUrl, {'email': emailId, 'password':pwd}, options)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);

  }

  private extractData(res: Response) {
    console.log(res);
    let body = res.json();
    console.log(body);
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }  
}
