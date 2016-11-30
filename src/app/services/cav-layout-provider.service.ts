import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Subject }    from 'rxjs/Subject';


import {LayoutType, PanelLayout, WidgetStructor} from "../components/cav-profile-graph-view/interfaces/JsonLayoutDto";
import {NgGridItemEvent, onResizeGridObj} from "../components/cav-profile-graph-view/interfaces/INgGrid";

@Injectable()
export class CavLayoutService {

  private layOutResponse:LayoutType;
  private toggleClickPersonTest = new Subject<string>();

  /*Observable string sources.*/
  private onResizeMethodService = new Subject<onResizeGridObj>();
  constructor(private http:Http) {
   }
 
  // Uses http.get() to load a single JSON file
  getdefaultLayout() {
    return this.http.get('http://10.10.50.2:8001/DashboardServer/web1/file/layoutjson').map((res:Response) => res.json());
  }

  getAllWidgetData() {
    return this.http.get('http://10.10.50.2:8001/DashboardServer/web1/file/layoutjson').map((res:Response) => res.json());
  }

  saveUserLayoutData(jsonObject:Object){
    return this.http.post('http://10.10.50.2:8001/DashboardServer/web1/file/savelayoutjson', jsonObject).map((res: Response) => res.json());
  }

  setLayOutResponse(res:LayoutType){
    console.log(res);
    this.layOutResponse = res;
  }

  getLayOutResponse():LayoutType{
    return this.layOutResponse;
  }

  onResizeFired(event:onResizeGridObj){
    this.onResizeMethodService.next(event);

  }

  /*Service Observable for getting Menu Toggle Action.*/
   testResizeMethodProvider$ =  this.onResizeMethodService.asObservable();

}