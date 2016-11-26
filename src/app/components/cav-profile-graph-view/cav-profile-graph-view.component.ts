import { Component, OnInit } from '@angular/core';
import {NgGrid, NgGridItem} from 'angular2-grid';
import {NgGridConfig,NgGridItemConfig,NgGridItemEvent, NgLayoutGridOptions} from "./interfaces/INgGrid";
import {CavLayoutService} from "../../services/cav-layout-provider.service";
import {CavMenuNavigatorService} from "../../services/cav-menu-navigator.service";
import {Observable, } from 'rxjs/Rx';
import { Subscription }   from 'rxjs/Subscription';
import {LayoutType, PanelLayout, WidgetStructor} from "./interfaces/JsonLayoutDto";


interface Box {
	id: number;
	config: NgGridItemConfig;
}

@Component({
  selector: 'app-cav-profile-graph-view',
  templateUrl: 'app.html',
  styleUrls: ['app.css', 'NgGrid.css'],
})


export class CavProfileGraphViewComponent implements OnInit {

private showAdd: Array<boolean> = [];
public TodoItems: LayoutType;

/**This is for the chart available inside the widget */
chartHeight:number = 180;
intervalNumber:number = 5000;
newSubscription: Subscription;
options: Object = {credits:{enabled: false},chart: {type:"area",margin:[30,-50,60,65],height: this.chartHeight,width: 350},series: [{data: [29.9, 71.5, 106.4, 129.2]}]};

  ngOnInit() 
  {
	  let timer = Observable.timer(10000,this.intervalNumber);
      timer.subscribe(t=>this.PrintAllWidgetName());
  }

  PrintAllWidgetName()
  {
    
  }


  
  private boxes: Array<Box> = [];
  private max_rows:number = 12;
  private max_column:number = 12;
  private col_width:number = 98;
  private row_height:number = 42;

	private curNum: number = 5;
	private gridConfig: NgGridConfig = <NgGridConfig>{
    'margins': [4],            //  The size of the margins of each item. Supports up to four values in the same way as CSS margins. Can be updated using setMargins()
    'draggable': true,          //  Whether the items can be dragged. Can be updated using enableDrag()/disableDrag()
    'resizable': true,          //  Whether the items can be resized. Can be updated using enableResize()/disableResize()
    'max_cols': this.max_column,              //  The maximum number of columns allowed. Set to 0 for infinite. Cannot be used with max_rows
    'max_rows': this.max_rows,              //  The maximum number of rows allowed. Set to 0 for infinite. Cannot be used with max_cols
    'visible_cols': 3,          //  The number of columns shown on screen when auto_resize is set to true. Set to 0 to not auto_resize. Will be overriden by max_cols
    'visible_rows': 3,          //  The number of rows shown on screen when auto_resize is set to true. Set to 0 to not auto_resize. Will be overriden by max_rows
    'min_cols': 0,              //  The minimum number of columns allowed. Can be any number greater than or equal to 1.
    'min_rows': 0,              //  The minimum number of rows allowed. Can be any number greater than or equal to 1.
    'col_width': this.col_width,           //  The width of each column
    'row_height': this.row_height,          //  The height of each row
    'cascade': 'up',            //  The direction to cascade grid items ('up', 'right', 'down', 'left')
    'min_width': 0,           //  The minimum width of an item. If greater than col_width, this will update the value of min_cols
    'min_height': 0,          //  The minimum height of an item. If greater than row_height, this will update the value of min_rows
    'fix_to_grid': false,       //  Fix all item movements to the grid
    'auto_style': true,         //  Automatically add required element styles at run-time
    'auto_resize': false,       //  Automatically set col_width/row_height so that max_cols/max_rows fills the screen. Only has effect is max_cols or max_rows is set
    'maintain_ratio': true,    //  Attempts to maintain aspect ratio based on the colWidth/rowHeight values set in the config
    'prefer_new': false,        //  When adding new items, will use that items position ahead of existing items
    'limit_to_screen': true,   //  When resizing the screen, with this true and auto_resize false, the grid will re-arrange to fit the screen size. Please note, at present this only works with cascade direction up.
};

private _generateDefaultItemConfig(): NgGridItemConfig {
		return {
    'col': 1,               //  The start column for the item
    'row': 1,               //  The start row for the item
    'sizex': 4,             //  The start width in terms of columns for the item
    'sizey': 4,             //  The start height in terms of rows for the item
	'name':"",
	'widgetId':0,
    'dragHandle': '.handle',     //  The selector to be used for the drag handle. If null, uses the whole item
    'resizeHandle': null,   //  The selector to be used for the resize handle. If null, uses 'borderSize' pixels from the right for horizontal resize,
                            //    'borderSize' pixels from the bottom for vertical, and the square in the corner bottom-right for both
    'borderSize': 15,
    'fixed': false,         //  If the grid item should be cascaded or not. If yes, manual movement is required
    'draggable': true,      //  If the grid item can be dragged. If this or the global setting is set to false, the item cannot be dragged.
    'resizable': true,      //  If the grid item can be resized. If this or the global setting is set to false, the item cannot be resized.
    'payload': null,        //  An optional custom payload (string/number/object) to be used to identify the item for serialization
    'maxCols': 0,           //  The maximum number of columns for a particular item. This value will only override the value from the grid (if set) if it is smaller
    'minCols': 0,           //  The minimum number of columns for a particular item. This value will only override the value from the grid if larger
    'maxRows': 0,           //  The maximum number of rows for a particular item. This value will only override the value from the grid (if set) if it is smaller
    'minRows': 0,           //  The minimum number of rows for a particular item. This value will only override the value from the grid if larger
    'minWidth': 0,          //  The minimum width of a particular item. This value will override the value from the grid, as well as the minimum columns if the resulting size is larger
    'minHeight': 0,         //  The minimum height of a particular item. This value will override the value from the grid, as well as the minimum rows if the resulting size is larger
};
	}


    /**This  method will return a default configuration for every widget.
	 * This will be used while saving the users layout to server.
	 * This will serve the confuguration for every widget.
	 */
	private _generateLayOutItemConfig(): NgLayoutGridOptions 
	{
		return {'col': 1, 'row': 1, 'sizeX': 4, 'sizeY': 4,'name':'','widgetId':0};
	}

	private curItemCheck: number = 0;
	private itemPositions: Array<any> = [];
	constructor(private cavLayoutService: CavLayoutService, private cavMenuNavigatorService:CavMenuNavigatorService) 
	{
		/** it is important to have this subscribe call, since the request is only made if there is a subscriber  */ 
		//http.get('http://10.10.50.2:8001/DashboardServer/web1/file/layoutjson').map((res: Response) => res.json()).subscribe(res => this.drawLayoutFromJson(res));
		/**Here we are getting the layout json for the product UI gui */
		if(this.cavLayoutService.getLayOutResponse() == null){ /**Means there is no layout json available in service */
            cavLayoutService.getdefaultLayout().subscribe(res => this.drawLayoutFromJson(res));
		}
		else{  /**If the layout data is already available then no need to do request for Layout json*/
			this.drawLayoutFromJson(cavLayoutService.getdefaultLayout());
		}
		
		this.newSubscription = cavMenuNavigatorService.toggleClickPersonTestProvider$.subscribe(
              /*Getting Event Here.*/
              value1 => {this.saveUserLayoutToServer()}
		  );
		
		//cavLayoutService.getAllWidgetData().subscribe(res => this.drawLayoutFromJson(res));
		/**Once we got the  layout then we have to request for the request time interval for every widget and broad cast to every widgets*/
		/**Then we have to send request to get the data from the server and if data arises then broadcast data to every services*/
           
	}

    /**This is the default layout format in which we will save the user specific layout in server */
    saveLayOutJson:Object={"layoutName":"default.layout","layoutType":"System","layoutId":1,"columns":12,"rows":12,"col_width":98,"row_height":42,"panelLayout":{"id":"1","name":"Home","widgets":[]}};
	
	/**This method is used to save the layout which is now available in the scree.
	 * 
	 */
	saveUserLayoutToServer()
	{
		/**Iterating every widgets  and setting the data of every widgets to the NgLayoutGridOptions object*/
	    for(var i = 0; i < this.boxes.length; i++)
	    {
			/**Here we are getting the NgLayoutGridOptions object for each widgets available in the screen */
		    const conf = this._generateLayOutItemConfig();

            /**Setting the widgets configuration to the  NgLayoutGridOptions object so that we can save it*/
			conf.col = this.boxes[i].config.col;
			conf.row = this.boxes[i].config.row;
			conf.sizeX = this.boxes[i].config.sizex;
			conf.sizeY = this.boxes[i].config.sizey;
			conf.name = this.boxes[i].config.name;
			conf.widgetId = this.boxes[i].config.widgetId;

			/**pusing the widgets data to the layout json which we have to save to the server */
			this.saveLayOutJson["panelLayout"]["widgets"].push(conf);

	    } 
        /**Making HTTP post request to server so that we can save it to server */
		this.cavLayoutService.saveUserLayoutData(this.saveLayOutJson).subscribe(res => console.log(res));
		
	}
	
	/**This method is used to draw the layout on the screen which we got from server*/
	drawLayoutFromJson(res:any): void
	{
		/**Set the response layout json to layoutjson variable */
		//this.layoutJson = res;
		this.TodoItems = res;

		this.max_column = this.TodoItems.columns;
		this.max_rows = this.TodoItems.rows;
		this.row_height = this.TodoItems.row_height;
		this.col_width = this.TodoItems.col_width;
		
		this.cavLayoutService.setLayOutResponse(this.TodoItems);
		
		/*console.log("******************************************************");
		console.log(this.TodoItems);
		console.log("******************************************************");*/
		

        for (var i = 0; i < this.TodoItems.panelLayout.widgets.length; i++) 
		{
			/**Creating the default configuration object for every widget */
			const conf = this._generateDefaultItemConfig();

            /**Setting the row column sizeX sizeY value for every widget */
            /*conf.row = this.layoutJson["panelLayout"]["widgets"][i].row;
			conf.col = this.layoutJson["panelLayout"]["widgets"][i].col;
			conf.sizex = this.layoutJson["panelLayout"]["widgets"][i].sizeX;
			conf.sizey = this.layoutJson["panelLayout"]["widgets"][i].sizeY;
			conf.name = this.layoutJson["panelLayout"]["widgets"][i].name;
			conf.widgetId = this.layoutJson["panelLayout"]["widgets"][i].widgetId;*/

			conf.row = this.TodoItems.panelLayout.widgets[i].row;
			conf.col = this.TodoItems.panelLayout.widgets[i].col;
			conf.sizex = this.TodoItems.panelLayout.widgets[i].sizeX;
			conf.sizey = this.TodoItems.panelLayout.widgets[i].sizeY;
			conf.name = this.TodoItems.panelLayout.widgets[i].name;
			conf.widgetId = this.TodoItems.panelLayout.widgets[i].widgetId;
			
			this.showAdd[i+1]=true;
			
			this.boxes[i] = { id: i + 1, config: conf };
			//console.log(conf);
		}
		//this.saveUserLayoutToServer();
	}
	get ratioDisabled(): boolean {
		return (this.gridConfig.max_rows > 0 && this.gridConfig.visible_cols > 0) ||
			(this.gridConfig.max_cols > 0 && this.gridConfig.visible_rows > 0) ||
			(this.gridConfig.visible_cols > 0 && this.gridConfig.visible_rows > 0);
	}
	
	get itemCheck(): number {
		return this.curItemCheck;
	}
	
	set itemCheck(v: number) {
		console.log(v);
		this.curItemCheck = v;
	}
	
	get curItem(): NgGridItemConfig {
		return this.boxes[this.curItemCheck] ? this.boxes[this.curItemCheck].config : {};
	}
	
	addBox(): void {
		const conf: NgGridItemConfig = this._generateDefaultItemConfig();
		conf.payload = this.curNum++;
		this.boxes.push({ id: conf.payload, config: conf });
	}
	
	/*removeBox(id: number): void {
		if (this.boxes[this.curItemCheck]) {
			this.boxes.splice(this.curItemCheck, 1);
		}

		//for loop
	}*/

	removeBox(id:number): void {
        for(var i=0;i<this.boxes.length;i++){
            if(this.boxes[i].id == id){
                this.boxes.splice(i,1);
			}
		}
	}
	
	updateItem(index: number, event: NgGridItemEvent): void {
		// Do something here
	}
	
	onDrag(index: number, event: NgGridItemEvent): void {
		// Do something here
		console.log("**************** " + this.boxes[0].config.col);
	}
	
	onResize(index: number, event: NgGridItemEvent): void {
			//console.log("resize method called - "  , JSON.stringify(b.chart));
		this.chartHeight = event.height-4;
		
	}

	onResizeStop(item:NgGridItemEvent){
        console.log("Method called - " + item.height + " ** " + item.width);
	}
	
	openDialogBox(){

	}
	minimizeBox(id:number):void {
       console.log(this.showAdd[id])
       if(this.showAdd[id]){
           document.getElementById(""+id).style.height ="30px";
           this.showAdd[id]=false;
       }
	   else{
           document.getElementById(""+id).style.height ="290px";
           this.showAdd[id]=true;
		}
    }
	
	private _randomise(): void {
		for (var x in this.boxes) {
			this.boxes[x].config.col = Math.floor(Math.random() * 6) + 1;
			this.boxes[x].config.row = 1;
		}
	}

}
