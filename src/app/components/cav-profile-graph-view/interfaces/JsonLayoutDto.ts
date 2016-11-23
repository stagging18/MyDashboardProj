export interface LayoutType {
    layoutName: string;
    layoutType: string;
    layoutId: number;
    columns:number;
    rows:number;
    col_width: number;
    row_height: number;
    panelLayout:PanelLayout
}
export interface PanelLayout{
    id: string;
    name: string;
    widgets:WidgetStructor[];
}
export interface WidgetStructor{
    name: string;
    row: number;
    col: number;
    sizeX: number;
    sizeY: number;
    widgetId: number;
}