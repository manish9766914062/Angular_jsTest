declare var esri: any;
declare var google: any;

import * as wjcCore from 'wijmo/wijmo';
import * as wjcChart from 'wijmo/wijmo.chart';
// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, OnInit, ViewChild, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjChartModule } from 'wijmo/wijmo.angular2.chart';
import { WjGaugeModule } from 'wijmo/wijmo.angular2.gauge';
import { DashService } from './services/DdashService';
import { EsriMap } from './components/EsriMap';
import { EsriCrosshair } from './components/EsriCrosshair';
import { EsriLegend } from './components/EsriLegend';
import { GdashTile } from './components/GdashTile';
import { GdashSlider } from './components/GdashSlider';
import { LatitudePipe, LongitudePipe } from './pipes/GdashPipes';
'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp implements OnInit {
    search = '';                        // geocode a location
    location = null;                  // current map location (lat, lon, name, read only)
    domTapDescription = '';              // current map tapestry description
    selectedSource = null;               // tiles for a given info source
    sources = [];                        // information sources for the tiles
    @ViewChild('medianAgeChart') medianAgeChart: wjcChart.FlexChart;
    @ViewChild('householdIncomeChart') householdIncomeChart: wjcChart.FlexChart;
    @ViewChild('homeValueChart') homeValueChart: wjcChart.FlexChart;
    @ViewChild('homeValueDistributionChart') homeValueDistributionChart: wjcChart.FlexChart;

    private _geocoder: any;
    private _extent: any;
    private gdashService: DashService;

    constructor( @Inject(DashService) gdashService: DashService) {
        this.gdashService = gdashService;
    }

    ngOnInit() {
        this.gdashService.initService(this.onGotData.bind(this));
        this.sources = this.gdashService.getSources();
        this.extent = this.gdashService.getExtent();
        this.location = this.gdashService.getLocation();
    }

    get extent(): any {
        return this._extent;
    }
    set extent(value: any) {
        this._extent = value;
        this.gdashService.setExtent(value);
    }

    // get a description for an index (100 is the national average, 50 is half, 200 is double, etc)
    getIndexDescription(index: number) {
        return this.gdashService.getIndexDescription(index);
    }

    // show tiles for a given info source
    selectSource(source) {
        if (source != this.selectedSource) {
            for (var key in this.sources) {
                this.sources[key].selected = (this.sources[key] == source);
            }
            this.selectedSource = source;
         }
    }

    // go to the current location
    gotoCurrentLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position)=> {
                var c = position.coords;
                this.gotoLocation(c.latitude, c.longitude);
            });
            return true;
        }
        return false;
    };

    // go to any location
    gotoLocation(lat: number, lon: number) {
        var ptg = new esri.geometry.Point(lon, lat, this.extent.spatialReference);
        var ptm = esri.geometry.geographicToWebMercator(ptg);
        this.extent = this.extent.centerAt(ptm);
    }

    // geocode a location
    geoCode() {
        if (this.search && this.search.length > 0) {
            if (!this._geocoder) {
                this._geocoder = new google.maps.Geocoder();
            }
            this._geocoder.geocode({ 'address': this.search }, (results, status) => {
                if (status == google.maps.GeocoderStatus.OK) {
                    var loc = results[0].geometry.location;
                    this.gotoLocation(loc.lat(), loc.lng());
                    this.search = '';
                } else {
                    alert('Sorry, this search produced no results.');
                }
            });
        }
    }

    private onGotData() {
        this.location = this.gdashService.getLocation();
        this.domTapDescription = this.gdashService.getDomTapDescription();
        window.setTimeout(()=>{
            this.updateChart(this.medianAgeChart);
            this.updateChart(this.householdIncomeChart);
            this.updateChart(this.homeValueChart);
            this.updateChart(this.homeValueDistributionChart);
        }, 0);
    }

    private updateChart(chart: wjcChart.FlexChart) {
        if (!chart) {
            return;
        }
        var valueSeries = new wjcChart.Series();
        chart.series.clear();

        valueSeries.binding = 'value';
        valueSeries.style = {};
        valueSeries.style.fill = '#8f5ca6';
        valueSeries.style.stroke = '#8f5ca6';

        chart.bindingX = 'name';
        chart.series.push(valueSeries);
    }
}


@NgModule({
    imports: [WjInputModule, WjChartModule, WjGaugeModule, BrowserModule, FormsModule],
    declarations: [EsriMap, EsriCrosshair, EsriLegend, GdashTile, GdashSlider, LatitudePipe, LongitudePipe, AppCmp],
    providers: [DashService],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);