import {Component, OnInit} from '@angular/core';
import { CavProfileGraphViewComponent } from '../../cav-profile-graph-view/cav-profile-graph-view.component';
import {Http, Response} from '@angular/http';
import {Observable, } from 'rxjs/Rx';
@Component({
selector: 'test-run-info',
 templateUrl: 'cav-testrun.component.html',
  styleUrls: ['cav-testrun.component.css']
 })

export class  CavProfileGraphTestRun{
  
  testRunJson:Object={"runningTestRunNo":"","totalTestRunList":'',"totalArchiveTests":'',"totalLockedTests":'',"totalScripts":'',"totalScenarios":'',"testName":"","status":""};
  testRunDuplicateObj = {"runningTestRunNo":"NA","totalTestRunList":3,"totalArchiveTests":0,"totalLockedTests":1,"totalScripts":189,"totalScenarios":68,"testName":"NA","status":"NA"};
  private refreshIntervalTime = 180000;
  private testInfoUrl="http://10.10.50.3:8000/dashboard/productSummary/SummaryWebService/getDataForTestRun/"
  constructor(private _http:Http){
      this.getTestInfoDetails();
  }

  ngOnInit() 
  {
	  let timer = Observable.timer(20000,this.refreshIntervalTime);
      timer.subscribe(t=>this.getTestInfoDetails_1());
  }
  
  getTestInfoDetails(){
      console.log("getTestInfoDetails method called");
     this._http.get(this.testInfoUrl).map((res:Response) => res.json()).subscribe (res => this.getTestRunInfo(res));
  }
  getTestRunInfo(res:any){
      this.testRunJson = res;
  }

  getTestInfoDetails_1(){
      console.log("--------------------------------------------------------------");
      console.log(this.testRunJson);
      this.testRunJson = this.testRunDuplicateObj;
      console.log("--------------------------------------------------------------");
      console.log(this.testRunJson);
  }
}
