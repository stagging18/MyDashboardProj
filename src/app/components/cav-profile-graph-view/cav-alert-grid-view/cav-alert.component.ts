import { Component, ViewChild, OnInit } from '@angular/core';
import { CavProfileGraphViewComponent } from '../cav-profile-graph-view.component';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {Column} from './column';

@Component({
  selector: 'app-alert',
  templateUrl: 'cav-alert.component.html',
  styleUrls: ['cav-alert-data.component.scss']
})

export class AlertComponent {
  //private _alertUrl="http://10.10.50.5:8004/DashboardServer/web/ReportWebService/getAlertDataForProductUI";
  private _alertUrl="http://10.10.50.2:8016/DashboardServer/web/ReportWebService/getAlertDataForProductUI";
  alertInfo: Array<AlertInfoInterface>;
  public number;
  //private refreshInterval:number = 180000;
  private refreshInterval:number = 30000;
  alertInfoData:Object[] = [{"slNo":1,"dateTime": "", "severity": 1, "description": "", "refreshInterval":10000}];

  columns: Array<Column>;

  constructor(private _http : Http) {
    console.log("Constructor for AlertComponent called");
    this.getAlertDataFromServer();
  }

  /**Starts a timer so that we can get the alert data on every refresh interval */
  ngOnInit(){
    let timer = Observable.timer(20000,this.refreshInterval);
    timer.subscribe(t=>this.getAlertDataFromServer());
  }

  /**getting the data from server*/
  getAlertDataFromServer(){
    console.log("Method called fro alert ^^^^^^^^^^^^^");
    this._http.get(this._alertUrl).map(res => res.json()).subscribe(res => (this.doAssignValueAlert(res)));
  }
  
  /**
   * This method is used to assign the response value to the local variable.
   */
  doAssignValueAlert(res : any){
    this.alertInfoData = res;
    this.alertInfo = this.getAlertStatus();
    this.columns = this.getColumns();
    this.refreshInterval = this.alertInfoData[0]["refreshInterval"];
    console.log("============"+this.refreshInterval);
  }
  
  /**This method is used to push the alert data got from http request  to the array 
   * so that we can use it in the alert table widget
   */
  getAlertStatus():Array<AlertInfoInterface>{
    var arrAlertData:Array<AlertInfoInterface>=[];
    for(var i=0;i<this.alertInfoData.length;i++){
      arrAlertData[i] = {slNo:this.alertInfoData[i]["slNo"], date: this.alertInfoData[i]["dateTime"], severity:this.alertInfoData[i]["severity"], description:this.alertInfoData[i]["description"], refreshInterval:this.alertInfoData[i]["refreshInterval"]};
    }
    return arrAlertData;
  }
  /**This method is used to define the columns of the alert table */
  getColumns(): Array<Column> {
    console.log("getColumns()");
    return [
        new Column('slNo', '#'),
        new Column('date', 'Date/Time'),
        new Column('severity','Severity'),
        new Column('description','Description')
      ];
    }
  }
  /**Structor for the response of the alert data */
  export interface AlertInfoInterface {
    slNo:number;
    date:string;
    severity:number;
    description:string;
    refreshInterval:number;
  }
