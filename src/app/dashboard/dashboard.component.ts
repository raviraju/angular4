import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { Router }                   from '@angular/router';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: string;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { 
    this.user = 'Anonymous';
  }

  ngOnInit() : void {
    this.user = this.route.snapshot.paramMap.get('uname');
  }

  logout(){    
    this.router.navigate(['/']);
    document.getElementById('navbar').style.visibility = "visible";
  }

}
