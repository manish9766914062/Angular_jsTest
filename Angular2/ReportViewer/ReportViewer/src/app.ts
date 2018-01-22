import * as wjcViewer from 'wijmo/wijmo.viewer';

// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, AfterViewInit, ViewChild, NgModule, ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpModule, Http, Response } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { WjViewerModule } from 'wijmo/wijmo.angular2.viewer';

'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp implements AfterViewInit {

    @ViewChild('reportView') reportView: wjcViewer.ReportViewer;
    @ViewChild('flexReportsCombo') flexReportsCombo;
    @ViewChild('ssrsReportsCombo') ssrsReportsCombo;

    _reportInfo: string;
    _ssrsReportInfo = '';
    _serviceUrl = 'http://demos.componentone.com/ASPNET/c1webapi/4.0.20172.105/api/report';

    reportItems: any;
    ssrsItems: any;
    filePath: string;
    reportName: string;
    serviceUrl: string;
    paginated: boolean;

    constructor(@Inject(Http) http: Http) {
        //loading flex reports
        http.get("flexReport.config.json").subscribe((res: Response) => {
            var flexReports = res.json();
            this.reportItems = flexReports.categories;
            this._initializeReport(flexReports);
        });

        //loading ssrs reports
        http.get("ssrsReport.config.json").subscribe((res: Response) => {
            var ssrsReports = res.json();
            this.ssrsItems = ssrsReports.categories;
        });
    }

    ngAfterViewInit() {      
    }

    get reportInfo(): string {
        return this._reportInfo;
    }
    set reportInfo(value: string) {
        this._reportInfo = value;
        if (value === 'None') {
            return;
        }

        if (this._reportInfo) {
            this._loadFlexReport();
        }
    }

    get ssrsReportInfo(): string {
        return this._ssrsReportInfo;
    }
    set ssrsReportInfo(value: string) {
        this._ssrsReportInfo = value;
        if (value === 'None') {
            return;
        }
        if (this._ssrsReportInfo) {
            this._loadSsrsReport();
        }
    }

    private _initializeReport(flexReports: any) {
        var selectedReport = flexReports.selectedReport,
            selectedCategoryName = selectedReport.categoryName,
            selectedReportName = selectedReport.reportName;
        this.reportInfo = 'ReportsRoot/' + selectedCategoryName
            + '/' + selectedReportName + '.flxr' + '*' + selectedReportName;
    }

    private _loadFlexReport() {
        if (this.reportView && this._reportInfo) {
            this.ssrsReportsCombo.nativeElement.value = 'None';
            var reportInfo = this._reportInfo.split('*');
            this.filePath = reportInfo[0];
            this.reportName = reportInfo[1];
            this.serviceUrl = this._serviceUrl;
            this.paginated = true;
        }
    }

    private _loadSsrsReport() {
        if (this.reportView && this._ssrsReportInfo) {
            this.flexReportsCombo.nativeElement.value = 'None';
            this.filePath = this._ssrsReportInfo;
            this.reportName = '';
            this.serviceUrl = this._serviceUrl;
            this.paginated = false;
        }
    }
}

@NgModule({
    imports: [WjViewerModule, BrowserModule, FormsModule, HttpModule],
    declarations: [AppCmp],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
