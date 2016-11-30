import { Component, OnInit } from '@angular/core';
import { CavProfileGraphViewComponent } from '../cav-profile-graph-view.component';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Column} from './Column';

@Component({
  selector: 'app-build',
  templateUrl: 'build.component.html',
  styleUrls: ['cav-build-grid.component.scss']
})

export class BuildComponent {
private _buildUrl="http://10.10.50.3:8000/dashboard/productSummary/SummaryWebService/getBuildJsonData";
buildInfo: Array<BuildInfoInterface>;
buildInfoData:Object = {"latestBuild":"","name":"","allBuildDetails":{"build":[],"release":[]}};

columns: Array<Column>;

constructor(private _http : Http) {
  this.getBuildDataFromServer();
}

  /**getting the data from server*/
getBuildDataFromServer(){
  this._http.get(this._buildUrl).map(res => res.json()).subscribe(res => (this.doAssignValueBuild(res)));
}

  /**
   * This method is used to assign the response value to the local variable.
   */
doAssignValueBuild(res : any){
  this.buildInfoData = res;
  this.buildInfo = this.getBuild();
  this.columns = this.getColumns();
}

  /**This method is used to push the build data got from http request  to the array 
   * so that we can use it in the build widget
   */
getBuild():Array<BuildInfoInterface>{
  var arrBuildData=[];
    for(var i=0;i<this.buildInfoData["allBuildDetails"]["release"].length;i++){
    arrBuildData[i] = {slNo:i+1, release: this.buildInfoData["allBuildDetails"]["release"][i], build:this.buildInfoData["allBuildDetails"]["build"][i], image:""};
  }
return arrBuildData;
}
  /**This method is used to define the columns of the build widget */
getColumns(): Array<Column> {
    return [
        new Column('slNo', '#'),
        new Column('release', 'Release'),
        new Column('build','Build #'),
        new Column('image','imgForBuild')
   ];
}
}
  /**Structor for the response of the build data */
export interface BuildInfoInterface {
    slNo:number;
    release:string;
    build:string;
    image:string;
}
