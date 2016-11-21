import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class CavLayoutService {
  constructor(private http:Http) { }
 
  // Uses http.get() to load a single JSON file
  getdefaultLayout() {
    return this.http.get('http://10.10.50.2:8001/DashboardServer/web1/file/layoutjson').map((res:Response) => res.json());
  }

  getAllWidgetData() {
    return this.http.get('http://10.10.50.2:8001/DashboardServer/web1/file/layoutjson').map((res:Response) => res.json());
  }

  saveUserLayoutData(jsonObject:Object)
  {
    return this.http.post('http://10.10.50.2:8001/DashboardServer/web1/file/savelayoutjson', jsonObject).map((res: Response) => res.json());
  }

}