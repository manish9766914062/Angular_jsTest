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
var wjcCore = require("wijmo/wijmo");
var wjcChart = require("wijmo/wijmo.chart");
// Angular
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var platform_browser_1 = require("@angular/platform-browser");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var wijmo_angular2_chart_1 = require("wijmo/wijmo.angular2.chart");
var DataSvc_1 = require("./services/DataSvc");
'use strict';
// The FlexChartGroup application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp(dataSvc) {
        this.dataSvc = dataSvc;
        this.mainView = new wjcCore.CollectionView(this.dataSvc.getData(500));
        this.chartView = null;
        this.groupBy = 'country,city';
        this.aggregation = 'Sum';
        this.chartType = 'chart';
        this.aggregationText = 'Sum';
        this.chartViewPath = [];
        this.groupNamesMap = { country: 'Country', date: 'Year', city: 'City' };
        this.levelsColor = ['rgba(136,189,230,0.7)', 'rgba(251,178,88,0.7)', 'rgba(144,205,151,0.7)'];
    }
    AppCmp.prototype.ngAfterViewInit = function () {
        if (this.groupChart && this.groupChart.hostElement) {
            this.chartClick(this.groupChart);
            this._disableTouchToolTip(this.groupChart);
        }
        if (this.groupPie && this.groupPie.hostElement) {
            this.chartClick(this.groupPie);
            this._disableTouchToolTip(this.groupPie);
            this._addLegendLinkStyle(this.groupPie);
        }
        this.groupByMenuChanged();
    };
    AppCmp.prototype.groupByMenuChanged = function (sender) {
        var gd, groupName, groupNames = this.groupBy.split(',');
        gd = this.mainView.groupDescriptions;
        gd.clear();
        for (var i = 0; i < groupNames.length; i++) {
            groupName = groupNames[i];
            if (groupName == 'date') {
                var groupDesc = new wjcCore.PropertyGroupDescription(groupName, function (item, prop) {
                    return item.date.getFullYear();
                });
                gd.push(groupDesc);
            }
            else {
                var groupDesc = new wjcCore.PropertyGroupDescription(groupName);
                gd.push(groupDesc);
            }
        }
        this.chartViewPath = [];
        this._setChartView(this.mainView.groups);
    };
    ;
    AppCmp.prototype.aggregationMenuChanged = function (sender) {
        this._updateChart();
    };
    ;
    AppCmp.prototype.chartTypeMenuChanged = function (sender) {
        this._updateChart();
    };
    ;
    AppCmp.prototype.chartClick = function (chart) {
        var _this = this;
        chart.hostElement.addEventListener('click', function (evt) {
            var ht = chart.hitTest(evt), clklgdOnPie = false, idx, selectedGroup;
            if (_this.chartType === "pie" &&
                ht.chartElement == wjcChart.ChartElement.Legend) {
                clklgdOnPie = true;
            }
            idx = ht.pointIndex;
            if ((!clklgdOnPie && ht.distance !== 0) || idx < 0) {
                return;
            }
            // index is got here.
            selectedGroup = _this.chartView[idx];
            if (!selectedGroup || (selectedGroup && selectedGroup.isBottomLevel)) {
                return;
            }
            _this.chartViewPath.push(idx);
            _this._setChartView(selectedGroup.groups);
        });
    };
    ;
    AppCmp.prototype.changeChartView = function (level) {
        var paths, //chartView = this.mainView,
        l = this.chartViewPath.length;
        this.chartViewPath = [];
        if (l === level) {
            this._setChartView(this.mainView.groups);
            this.palette = [this.levelsColor[this.chartViewPath.length]];
            return;
        }
        paths = this.headerHref.toString().split(',');
        if (paths.length <= 0) {
            return;
        }
        var chartView = this.mainView.groups;
        for (var i = 0; i < paths.length; i++) {
            chartView = chartView[paths[i]].groups;
            this.chartViewPath.push(paths[i]);
        }
        this._setChartView(chartView);
    };
    ;
    AppCmp.prototype._setChartView = function (view) {
        this.chartView = view;
        this._updateChart();
    };
    ;
    AppCmp.prototype._updateChart = function () {
        var groups = this.chartView;
        if (groups && groups.length > 0) {
            this._updateChartItemsSource();
            this._updateHeader();
            this.palette = [this.levelsColor[this.chartViewPath.length]];
        }
    };
    ;
    AppCmp.prototype._updateChartItemsSource = function () {
        var _this = this;
        var groups = this.chartView, groupItems = [], sereiesName = this.aggregation;
        if (groups && groups.length > 0) {
            //for year to string: sort the group item(year)
            groups.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                else {
                    return -1;
                }
            });
            this.bindname = this.bindvalue = sereiesName;
            groups.forEach(function (group, idx) {
                var groupName = group.groupDescription.propertyName, groupItem = {}, aggregateVal = group.getAggregate(wjcCore.Aggregate[_this.aggregation], 'amount');
                if (idx === 0) {
                    _this.bindx = groupName;
                }
                groupItem[groupName] = group.name.toString();
                groupItem[sereiesName] = aggregateVal;
                groupItems.push(groupItem);
            });
            this.itemsSource = groupItems;
        }
    };
    ;
    AppCmp.prototype._updateHeader = function () {
        var level = this.chartViewPath.length, groups = this.mainView.groups, currentGroupDescName = this.groupNamesMap[this.mainView.groupDescriptions[0].propertyName], headerEle = document.querySelector('h3'), header = this.aggregationText + ' By ' + this.groupNamesMap[this.mainView.groupDescriptions[level].propertyName], headerLinkTxt, groupIndex, groupName;
        //change header
        if (level > 0) {
            for (var i = 0; i < level; i++) {
                groupIndex = this.chartViewPath[i];
                groupName = groups[groupIndex].name;
                if (i === level - 1) {
                    //headerLinkTxt += groupName + ' - ';
                    this.headerTitle = groupName;
                }
                else {
                    this.headerHref = this.chartViewPath.slice(0, i + 1).join(',');
                }
                if (level - i === 1) {
                    this.headerAnchorLevel1 = groupName;
                }
                else if (level - i === 2) {
                    this.headerAnchorLevel2 = groupName;
                }
                groups = groups[groupIndex].groups;
            }
            //header = headerLinkTxt + header;
        }
        this.byLabel = header;
    };
    ;
    AppCmp.prototype._disableTouchToolTip = function (chart) {
        if (chart.tooltip) {
            chart.tooltip.content = function (ht) {
                if (chart.isTouching) {
                    return null; // no tooltip
                }
                else if (ht.series) {
                    if (ht.item) {
                        return '<b>' + ht.series.name + '</b><br/>' + ht.x + ' ' + ht.y.toFixed();
                    }
                    else {
                        return null;
                    }
                }
                else {
                    return '<b>' + ht.name + '</b><br/>' + ht.value.toFixed();
                }
            };
        }
    };
    AppCmp.prototype._addLegendLinkStyle = function (chart) {
        var _this = this;
        var level, labels, cvpLength;
        if (!chart || (chart && chart.legend && chart.legend.position === wjcChart.Position.None)) {
            return;
        }
        //add hover style to pie legend
        chart.rendered.addHandler(function () {
            cvpLength = _this.chartViewPath.length;
            level = _this.mainView.groupDescriptions.length;
            if (cvpLength >= 0 && cvpLength < level - 1) {
                labels = chart.hostElement.querySelectorAll('.wj-legend .wj-label');
                [].forEach.call(labels, function (label) {
                    wjcCore.addClass(label, "labellink");
                });
            }
        });
    };
    ;
    __decorate([
        core_1.ViewChild('groupChart')
    ], AppCmp.prototype, "groupChart", void 0);
    __decorate([
        core_1.ViewChild('groupPie')
    ], AppCmp.prototype, "groupPie", void 0);
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app-cmp',
            templateUrl: 'src/app.html'
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], AppCmp);
    return AppCmp;
}());
exports.AppCmp = AppCmp;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_input_1.WjInputModule, wijmo_angular2_chart_1.WjChartModule, platform_browser_1.BrowserModule, forms_1.FormsModule],
            declarations: [AppCmp],
            providers: [DataSvc_1.DataSvc],
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