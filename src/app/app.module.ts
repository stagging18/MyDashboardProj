import { BrowserModule } from '@angular/platform-browser';
import {NgModule, ApplicationRef, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '@angular/material';
/**imported by rajesh */
import {NgGridModule} from 'angular2-grid';
import { ChartModule } from 'angular2-highcharts';
/**imported by rajesh */
import {APP_ROUTES} from './components/cav-content/routes';
import { Logger, Options as LoggerOptions, Level as LoggerLevel } from "angular2-logger/core";
import {CavLayoutService} from './services/cav-layout-provider.service';

import { AppComponent } from './app.component';
import { CavNavBarComponent } from './components/cav-nav-bar/cav-nav-bar.component';
import { CavMainComponent } from './components/cav-main/cav-main-component';
import { CavProfileGraphViewComponent } from './components/cav-profile-graph-view/cav-profile-graph-view.component';
import { CavContentComponent } from './components/cav-content/cav-content.component';
import { CavMainMenuNavignationComponent } from './components/cav-main-menu-navignation/cav-main-menu-navignation.component';
import { CavMenuNavigatorService } from './services/cav-menu-navigator.service';
import { CavMenuComponent } from './components/cav-menu/cav-menu.component';
import { CavMenuItemComponent } from './components/cav-menu-item/cav-menu-item.component';

import {CavProfileGraphTestRun} from './components/cav-profile-graph-view/cav-profile-test-run/cav-profile-graph-testrun.component';
import {AlertComponent} from './components/cav-profile-graph-view/cav-alert-grid-view/cav-alert.component';
import {TopCmdComponent} from './components/cav-profile-graph-view/cav-top-cmd-view/cav-top-cmd.component';
import {BuildComponent} from './components/cav-profile-graph-view/cav-build-grid-view/cav-build.component';
@NgModule({
  declarations: [
    AppComponent,
    CavNavBarComponent,
    CavMainComponent,
    CavProfileGraphViewComponent,
    CavContentComponent,
    CavMainMenuNavignationComponent,
    CavMenuComponent,
    CavMenuItemComponent,
	CavProfileGraphTestRun,
	AlertComponent,
  TopCmdComponent,
  BuildComponent,
  ],
  entryComponents: [
    AppComponent,
],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	  NgGridModule,
    ChartModule,
    RouterModule.forRoot(APP_ROUTES),
    MaterialModule.forRoot(),
  ],
  providers: [
    CavMenuNavigatorService,CavLayoutService,
    { provide: LoggerOptions, useValue: { level: LoggerLevel.INFO } },
    Logger,
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {

  constructor(private _appRef: ApplicationRef) { }

  ngDoBootstrap() {
    this._appRef.bootstrap(AppComponent);
  }
}
