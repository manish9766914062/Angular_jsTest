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
// Angular
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var platform_browser_1 = require("@angular/platform-browser");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var wijmo_angular2_chart_1 = require("wijmo/wijmo.angular2.chart");
var DataSvc_1 = require("./services/DataSvc");
'use strict';
// The Explorer application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp(dataSvc) {
        var _this = this;
        this.tasks = [];
        // show the percentage complete for each task
        this.ganttItemFormatter = function (engine, hti, defaultFormatter) {
            // draw the item as usual
            defaultFormatter();
            // show percentage done
            var task = hti.item;
            if (wjcCore.isNumber(task.percent) && task.percent > 0) {
                var pct = wjcCore.clamp(task.percent, 0, 100) / 100, rc = _this.getTaskRect(hti.series.chart, task).inflate(-8, -8);
                engine.fill = pct == 1 ? 'green' : 'gold'; //engine.stroke;
                engine.drawRect(rc.left, rc.top, rc.width * pct, rc.height);
            }
        };
        this.ganttFormatter = function (engine, hti, fn) {
            fn();
            var chart = hti._chart, pt = hti.point, item = hti.item;
            var x1 = chart.axisX.convert(item.start);
            var x2 = chart.axisX.convert(item.end);
            //0.35 is half height of 0.7 which is the bar height.
            var offY = Math.abs(chart.axisY.convert(0) - chart.axisY.convert(0.35));
            var y = pt.y + offY;
            var y2 = pt.y - offY;
            var per = item.percent;
            var seriesGroup = chart.hostElement.querySelector('.wj-series-group');
            if (per && per > 0) {
                if (per > 100) {
                    per = 100;
                }
                var x = x1 + (x2 - x1) * per / 100;
                engine.fill = engine.stroke;
                engine.drawRect(x1, y2, x - x1, offY * 2);
            }
            if (_this.tasks.length > 0) {
                _this.tasks.forEach(function (task, i) {
                    var parents = task.parent.split(',');
                    if (parents && parents.length > 0) {
                        var pIdx_1 = -1;
                        parents.some(function (p, j) {
                            if (p === hti.x) {
                                pIdx_1 = j;
                                return true;
                            }
                        });
                        if (pIdx_1 > -1) {
                            parents.splice(pIdx_1, 1);
                            task.parent = parents.join(',');
                            var pt_1 = task.pt, xs = [pt_1.x - 5, pt_1.x, pt_1.x - 5, pt_1.x, (x1 + x2) / 2, (x1 + x2) / 2], ys = [pt_1.y - 5, pt_1.y, pt_1.y + 5, pt_1.y, pt_1.y, y];
                            var el = engine.drawLines(xs, ys, 'connector', { stroke: '#000000' });
                            //move connector line to before bar to prevent line covering bar elements.
                            seriesGroup.insertBefore(el, seriesGroup.firstChild);
                        }
                    }
                });
                _this.tasks = _this.tasks.filter(function (task) { return task.parent.length > 0; });
            }
            if (item.parent && item.parent.length > 0) {
                _this.tasks.push({
                    parent: item.parent,
                    isCriticalPath: item.isCriticalPath,
                    pt: pt
                });
            }
        };
        this.dataSvc = dataSvc;
        this.data = this.dataSvc.getData(5);
        this.depData = this.dataSvc.getDepData();
    }
    // utilities
    AppCmp.prototype.getTooltipContent = function (ht) {
        var str = wjcCore.format('<b>{name}</b>:<br/>{start:d} - {end:d}', {
            name: ht.x,
            start: ht.item.start,
            end: ht.item.end
        });
        if (ht.item && ht.item.percent != null) {
            str += wjcCore.format('<br/><i>percent complete: {percent}%</i>', ht.item);
        }
        return str;
    };
    // show the task dependencies
    AppCmp.prototype.ganttChartRendered = function (chart, e) {
        var self = this, tasks = chart.collectionView.items;
        tasks.forEach(function (task) {
            var parents = self.getTaskParents(task, tasks); // get the parent tasks
            parents.forEach(function (parent) {
                self.drawConnectingLine(e.engine, chart, task, parent); // draw connector
            });
        });
    };
    AppCmp.prototype.drawConnectingLine = function (engine, chart, task, parent) {
        var rc1 = this.getTaskRect(chart, parent), // parent rect
        rc2 = this.getTaskRect(chart, task), // task rect
        x1 = rc1.left + rc1.width / 2, // parent x center
        x2 = rc2.left, // task left
        y1 = rc1.bottom, // parent bottom
        y2 = rc2.top + rc2.height / 2; // task y center
        // draw connecting line
        var xs = [x1, x1, x2], ys = [y1, y2, y2];
        engine.drawLines(xs, ys, 'connector', {
            stroke: 'black'
        });
        // draw arrow at the end
        var sz = 5;
        xs = [x2 - 2 * sz, x2, x2 - 2 * sz];
        ys = [y2 - sz, y2, y2 + sz];
        engine.drawPolygon(xs, ys, 'arrow', {
            fill: 'black'
        });
    };
    AppCmp.prototype.getTaskRect = function (chart, task) {
        var x1 = chart.axisX.convert(task.start), x2 = chart.axisX.convert(task.end), index = chart.collectionView.items.indexOf(task), y1 = chart.axisY.convert(index - .35), y2 = chart.axisY.convert(index + .35);
        return new wjcCore.Rect(x1, y1, x2 - x1 + 1, y2 - y1 + 1);
    };
    AppCmp.prototype.getTaskParents = function (task, tasks) {
        var parents = [];
        if (task.parent) {
            task.parent.split(',').forEach(function (name) {
                for (var i = 0; i < tasks.length; i++) {
                    if (tasks[i].name == name) {
                        parents.push(tasks[i]);
                        break;
                    }
                }
            });
        }
        return parents;
    };
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