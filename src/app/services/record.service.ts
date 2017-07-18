import { Injectable }               from '@angular/core';
import { Http, Response }           from '@angular/http';
import { Headers, RequestOptions }  from '@angular/http';

import { Record }                   from '../record';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class RecordService {

  recordsUrl: string;

  constructor(private http: Http) { 
    this.recordsUrl = 'http://localhost:4200/api/records';
  }

  getRecords():Promise<Record[]>{
    return this.http.get(this.recordsUrl) 
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);

  }

  addRecord(record):Promise<Boolean>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log("add record");
    console.log(record);
    return this.http.post(this.recordsUrl, record, options)
               .toPromise()
               .then(this.extractData)
               .catch(this.handleError);
  }

  editRecord(record):Promise<Boolean>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log("edit record");
    console.log(record);
    let recordUrl = this.recordsUrl + "/" + record._id;
    return this.http.put(recordUrl, record, options)
               .toPromise()
               .then(this.extractData)
               .catch(this.handleError);
  }

  deleteRecord(record):Promise<Boolean>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log("delete record");
    console.log(record);
    let recordUrl = this.recordsUrl + "/" + record._id;
    return this.http.delete(recordUrl, options)
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
