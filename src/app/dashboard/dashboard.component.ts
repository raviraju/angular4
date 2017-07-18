import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { Router }                   from '@angular/router';
import { Ng2SmartTableModule }      from 'ng2-smart-table';
import { LocalDataSource  }         from 'ng2-smart-table';

import { Record }         from '../record';
import { RecordService }  from '../services/record.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [RecordService]
})
export class DashboardComponent implements OnInit {

  user: string;
  settings: any;
  data: any;
  source: LocalDataSource;


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private recordService: RecordService
  ) { 
    this.user = 'Anonymous';

    this.settings = {
      delete: {
        confirmDelete: true,
      },
      add: {
        confirmCreate: true,
      },
      edit: {
        confirmSave: true,
      },
      columns: {
        name: {
          title: 'Name'
        },
        address: {
          title: 'Address'
        },
        ssot_name: {
          title: 'SSOT Name'
        },
        exception_type: {
          title: 'Exception Type',
          filter:{
            type: 'list',
            config: {
              selectText: 'Select Exception Type',
              list: [
                { value: 'Perfect', title: 'Perfect' },
                { value: 'Recommended', title: 'Recommended' },
                { value: 'Needs Review', title: 'Needs Review' },
                { value: 'Severe', title: 'Severe' },
              ],
            }
          },
          editor:{
            type: 'list',
            config: {
              selectText: 'Select Exception Type',
              list: [
                { value: 'Perfect', title: 'Perfect' },
                { value: 'Recommended', title: 'Recommended' },
                { value: 'Needs Review', title: 'Needs Review' },
                { value: 'Severe', title: 'Severe' },
              ],
            }
          }                    
        },
        load_date:{
          title: 'Load Date',
          filter: false
        }
      }
    };

    this.data = [
      {
        name: "Ravi Raju",
        address: "Bangalore",
        ssot_name: "Ssot 1",
        exception_type: "Perfect",
        load_date: "1 Jan 2017"
      },
      {
        name: "Kiran Raju",
        address: "Mysore",
        ssot_name: "Ssot 2",
        exception_type: "Recommended",
        load_date: "1 Feb 2017"
      },
      {
        name: "Deepa Raju",
        address: "Delhi",
        ssot_name: "Ssot 3",
        exception_type: "Needs Review",
        load_date: "1 Mar 2017"
      },
      {
        name: "Krishna",
        address: "Bangalore",
        ssot_name: "Ssot 4",
        exception_type: "Severe",
        load_date: "1 Apr 2017"
      },
      {
        name: "Ravi Raju",
        address: "Bangalore",
        ssot_name: "Ssot 1",
        exception_type: "Perfect",
        load_date: "1 Jan 2017"
      },
      {
        name: "Kiran Raju",
        address: "Mysore",
        ssot_name: "Ssot 2",
        exception_type: "Recommended",
        load_date: "1 Feb 2017"
      },
      {
        name: "Deepa Raju",
        address: "Delhi",
        ssot_name: "Ssot 3",
        exception_type: "Needs Review",
        load_date: "1 Mar 2017"
      },
      {
        name: "Krishna",
        address: "Bangalore",
        ssot_name: "Ssot 4",
        exception_type: "Severe",
        load_date: "1 Apr 2017"
      },
      {
        name: "Ravi Raju",
        address: "Bangalore",
        ssot_name: "Ssot 1",
        exception_type: "Perfect",
        load_date: "1 Jan 2017"
      },
      {
        name: "Kiran Raju",
        address: "Mysore",
        ssot_name: "Ssot 2",
        exception_type: "Recommended",
        load_date: "1 Feb 2017"
      },
      {
        name: "Deepa Raju",
        address: "Delhi",
        ssot_name: "Ssot 3",
        exception_type: "Needs Review",
        load_date: "1 Mar 2017"
      },
      {
        name: "Krishna",
        address: "Bangalore",
        ssot_name: "Ssot 4",
        exception_type: "Severe",
        load_date: "1 Apr 2017"
      }               
    ];    

    this.source = new LocalDataSource();
  }

  ngOnInit() : void {
    this.user = this.route.snapshot.paramMap.get('uname');

    this.recordService.getRecords().then((data) => {
      this.data = data;
      this.source.load(this.data);
    });
  }

  logout(){    
    this.router.navigate(['/']);
    document.getElementById('navbar').style.visibility = "visible";
  }

  onCreateConfirm(event) {
    this.recordService.addRecord(event.newData).then((result) =>{
      if(result){
        console.log("Record Created");
        event.confirm.resolve();
      }
      else{
        console.log("Unable to create Record");
        event.confirm.reject();
      }
    });
  }  

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      console.log(event);
      this.recordService.deleteRecord(event.data).then((result) =>{
            if(result){
              console.log("Record Deleted");
              event.confirm.resolve();
            }
            else{
              console.log("Unable to delete Record");
              event.confirm.reject();
            }
          });

    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    this.recordService.editRecord(event.newData).then((result) =>{
      if(result){
        console.log("Record Modified");
        event.confirm.resolve();
      }
      else{
        console.log("Unable to modify Record");
        event.confirm.reject();
      }
    });

  }


}
