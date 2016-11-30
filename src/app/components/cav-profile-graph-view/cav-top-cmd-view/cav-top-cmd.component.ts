import { Component } from "@angular/core"
import {Column} from './column';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Subscription }   from 'rxjs/Subscription';
import {CavLayoutService} from '../../../services/cav-layout-provider.service';
import {NgGridItemEvent, onResizeGridObj} from "../interfaces/INgGrid";

@Component({
    selector : 'app-top',
    templateUrl : 'top-cmd.component.html',
    styleUrls : ['topcmd.component.scss']
})

export class TopCmdComponent{
    public topData;
    newSubscription: Subscription;
    private _topUrl="http://10.10.50.3:8000/dashboard/productSummary/SummaryWebService/getTopCmdData";
    topDataFromServer:Object = {"topDetails":"","loadAverageDetails":"","tasksDetails":"","cpuDetails":"","memoryDetails":"","swapDetails":"","refreshInterval":100000,"name":"","topFiveDetails":[]};
    private topDetails;
    private refreshInterval:number = 30000;
    topInfoData: Array<TopInfo>;
    columns: Array<Column>;
    constructor(private _http: Http, private cavLayoutService:CavLayoutService) {
        this.getTopDataFromServer();
        this.newSubscription = cavLayoutService.testResizeMethodProvider$.subscribe(
              /*Getting Event Here.*/
              value1 => {this.onResizeMethodCalled(value1)}
		  );
    }

    onResizeMethodCalled(value1:onResizeGridObj):void{

        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        console.log(value1.eventData.height + " ** " + value1.widgetId);
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        document.getElementById("topTableId").style.height=(value1.eventData.height-29)+"px";
        
    }
    
    /**getting the data from server*/
    getTopDataFromServer(){
        return this._http.get(this._topUrl).map(res => res.json()).subscribe(res=>this.doAssignValue(res));
    }
    
    /**Starts a timer so that we can get the alert data on every refresh interval */
    ngOnInit(){
        let timer = Observable.timer(20000,this.refreshInterval);
        timer.subscribe(t=>this.getTopDataFromServer());
    }
    
    /**
     * This method is used to assign the response value to the local variable.
     */
    doAssignValue(res:any){
        this.topDataFromServer =  res;
        this.topInfoData = this.getTopData();
        this.columns = this.getColumns();
        this.refreshInterval = this.topInfoData["refreshInterval"];
    }
    
    /**This method is used to push the top data got from http request  to the array 
     * so that we can use it in the top table
     */
    
    getTopData(): Array<TopInfo>{
        return [
            {topcmdData:this.topDataFromServer["topDetails"], topName:'Top'},
            {topcmdData:this.topDataFromServer["loadAverageDetails"], topName:'Load Avg'},
            {topcmdData:this.topDataFromServer["tasksDetails"], topName:'Tasks'},
            {topcmdData:this.topDataFromServer["cpuDetails"], topName:'CPU(S)'},
            {topcmdData:this.topDataFromServer["memoryDetails"], topName:'Mem'},
            {topcmdData:this.topDataFromServer["swapDetails"], topName:'Swap'}
        ];
    }
    
    /**Creating the column definitions */
    getColumns(): Array<Column> {
        return [
            new Column('topName'),
            new Column('topcmdData')
        ];
    }
}

/**Structor for the response of the build data */
interface TopInfo {
    topName:string;
    topcmdData:string;
}

