"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var wjcChart = require("wijmo/wijmo.chart");
// Angular
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var platform_browser_1 = require("@angular/platform-browser");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var wijmo_angular2_chart_1 = require("wijmo/wijmo.angular2.chart");
var wijmo_angular2_gauge_1 = require("wijmo/wijmo.angular2.gauge");
var DdashService_1 = require("./services/DdashService");
var EsriMap_1 = require("./components/EsriMap");
var EsriCrosshair_1 = require("./components/EsriCrosshair");
var EsriLegend_1 = require("./components/EsriLegend");
var GdashTile_1 = require("./components/GdashTile");
var GdashSlider_1 = require("./components/GdashSlider");
var GdashPipes_1 = require("./pipes/GdashPipes");
'use strict';
// The application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp(gdashService) {
        this.search = ''; // geocode a location
        this.location = null; // current map location (lat, lon, name, read only)
        this.domTapDescription = ''; // current map tapestry description
        this.selectedSource = null; // tiles for a given info source
        this.sources = []; // information sources for the tiles
        this.gdashService = gdashService;
    }
    AppCmp.prototype.ngOnInit = function () {
        this.gdashService.initService(this.onGotData.bind(this));
        this.sources = this.gdashService.getSources();
        this.extent = this.gdashService.getExtent();
        this.location = this.gdashService.getLocation();
    };
    Object.defineProperty(AppCmp.prototype, "extent", {
        get: function () {
            return this._extent;
        },
        set: function (value) {
            this._extent = value;
            this.gdashService.setExtent(value);
        },
        enumerable: true,
        configurable: true
    });
    // get a description for an index (100 is the national average, 50 is half, 200 is double, etc)
    AppCmp.prototype.getIndexDescription = function (index) {
        return this.gdashService.getIndexDescription(index);
    };
    // show tiles for a given info source
    AppCmp.prototype.selectSource = function (source) {
        if (source != this.selectedSource) {
            for (var key in this.sources) {
                this.sources[key].selected = (this.sources[key] == source);
            }
            this.selectedSource = source;
        }
    };
    // go to the current location
    AppCmp.prototype.gotoCurrentLocation = function () {
        var _this = this;
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var c = position.coords;
                _this.gotoLocation(c.latitude, c.longitude);
            });
            return true;
        }
        return false;
    };
    ;
    // go to any location
    AppCmp.prototype.gotoLocation = function (lat, lon) {
        var ptg = new esri.geometry.Point(lon, lat, this.extent.spatialReference);
        var ptm = esri.geometry.geographicToWebMercator(ptg);
        this.extent = this.extent.centerAt(ptm);
    };
    // geocode a location
    AppCmp.prototype.geoCode = function () {
        var _this = this;
        if (this.search && this.search.length > 0) {
            if (!this._geocoder) {
                this._geocoder = new google.maps.Geocoder();
            }
            this._geocoder.geocode({ 'address': this.search }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var loc = results[0].geometry.location;
                    _this.gotoLocation(loc.lat(), loc.lng());
                    _this.search = '';
                }
                else {
                    alert('Sorry, this search produced no results.');
                }
            });
        }
    };
    AppCmp.prototype.onGotData = function () {
        var _this = this;
        this.location = this.gdashService.getLocation();
        this.domTapDescription = this.gdashService.getDomTapDescription();
        window.setTimeout(function () {
            _this.updateChart(_this.medianAgeChart);
            _this.updateChart(_this.householdIncomeChart);
            _this.updateChart(_this.homeValueChart);
            _this.updateChart(_this.homeValueDistributionChart);
        }, 0);
    };
    AppCmp.prototype.updateChart = function (chart) {
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
    };
    __decorate([
        core_1.ViewChild('medianAgeChart')
    ], AppCmp.prototype, "medianAgeChart", void 0);
    __decorate([
        core_1.ViewChild('householdIncomeChart')
    ], AppCmp.prototype, "householdIncomeChart", void 0);
    __decorate([
        core_1.ViewChild('homeValueChart')
    ], AppCmp.prototype, "homeValueChart", void 0);
    __decorate([
        core_1.ViewChild('homeValueDistributionChart')
    ], AppCmp.prototype, "homeValueDistributionChart", void 0);
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app-cmp',
            templateUrl: 'src/app.html'
        }),
        __param(0, core_1.Inject(DdashService_1.DashService))
    ], AppCmp);
    return AppCmp;
}());
exports.AppCmp = AppCmp;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_input_1.WjInputModule, wijmo_angular2_chart_1.WjChartModule, wijmo_angular2_gauge_1.WjGaugeModule, platform_browser_1.BrowserModule, forms_1.FormsModule],
            declarations: [EsriMap_1.EsriMap, EsriCrosshair_1.EsriCrosshair, EsriLegend_1.EsriLegend, GdashTile_1.GdashTile, GdashSlider_1.GdashSlider, GdashPipes_1.LatitudePipe, GdashPipes_1.LongitudePipe, AppCmp],
            providers: [DdashService_1.DashService],
            bootstrap: [AppCmp]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
core_1.enableProdMode();
// Bootstrap application with hash style navigation and global services.
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
//# sourceMappingURL=app.js.map