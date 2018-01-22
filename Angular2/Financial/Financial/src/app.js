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
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var DataSvc_1 = require("./services/DataSvc");
'use strict';
// The application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp(dataSvc) {
        this.clearCells = false;
        this.interval = 100; // update interval in ms: 1000, 500, 100, 10, 1
        this.intervalData = [1000, 500, 100, 10, 1];
        this.batchSizeData = [100, 50, 10, 5, 1];
        this.batchSize = 5; // items to update: 100, 50, 10, 5, 1
        this.cellElements = {};
        this._customCells = true;
        this._autoUpdate = true;
        this.data = dataSvc.getData();
    }
    AppCmp.prototype.ngAfterViewInit = function () {
        this.theGrid.rowHeaders.columns[0].width = 80;
        this._updateTrades();
    };
    AppCmp.prototype.updatingView = function () {
        this.clearCells = true; // clear cell elements on next formatItem
    };
    Object.defineProperty(AppCmp.prototype, "customCells", {
        get: function () {
            return this._customCells;
        },
        set: function (value) {
            if (this._customCells !== value) {
                this._customCells = value;
                this.theGrid.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppCmp.prototype, "autoUpdate", {
        get: function () {
            return this._autoUpdate;
        },
        set: function (value) {
            if (this._autoUpdate !== value) {
                this._autoUpdate = value;
                this.theGrid.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    AppCmp.prototype.formatItem = function (s, e) {
        // show symbols in row headers
        var item;
        if (e.panel == s.rowHeaders && e.col == 0) {
            item = s.rows[e.row].dataItem.symbol;
            e.cell.textContent = item;
        }
        // regular cells
        if (e.panel == s.cells) {
            var col = s.columns[e.col], item_1 = s.rows[e.row].dataItem;
            // clear cell elements
            if (this.clearCells) {
                this.clearCells = false;
                this.cellElements = {};
            }
            // store cell element
            if (!this.cellElements[item_1.symbol]) {
                this.cellElements[item_1.symbol] = { item: item_1 };
            }
            this.cellElements[item_1.symbol][col.binding] = e.cell;
            // custom painting
            this._formatCell(e.cell, item_1, col, false);
        }
    };
    AppCmp.prototype._updateTrades = function () {
        var _this = this;
        var now = new Date(), changedItems = {};
        for (var i = 0; i < this.batchSize; i++) {
            // select an item
            var item = this.data[DataSvc_1.DataSvc.randBetween(0, this.data.length - 1)];
            // update current data
            item.bid = item.bid * (1 + (Math.random() * .11 - .05));
            item.ask = item.ask * (1 + (Math.random() * .11 - .05));
            item.bidSize = DataSvc_1.DataSvc.randBetween(10, 1000);
            item.askSize = DataSvc_1.DataSvc.randBetween(10, 1000);
            var sale = (item.ask + item.bid) / 2;
            item.lastSale = sale;
            item.lastSize = Math.floor((item.askSize + item.bidSize) / 2);
            item.quoteTime = now;
            item.tradeTime = new Date(Date.now() + DataSvc_1.DataSvc.randBetween(0, 60000));
            // update history data
            this._addHistory(item.askHistory, item.ask);
            this._addHistory(item.bidHistory, item.bid);
            this._addHistory(item.saleHistory, item.lastSale);
            // keep track of changed items
            changedItems[item.symbol] = true;
        }
        // update the grid
        if (this.autoUpdate) {
            this._updateGrid(changedItems);
        }
        // and schedule the next batch
        setTimeout(function () {
            _this._updateTrades();
        }, this.interval);
    };
    // update grid cells when items change
    AppCmp.prototype._updateGrid = function (changedItems) {
        var _this = this;
        var _loop_1 = function (symbol) {
            var itemCells = this_1.cellElements[symbol];
            if (itemCells) {
                var item_2 = itemCells.item;
                this_1.theGrid.columns.forEach(function (col) {
                    var cell = itemCells[col.binding];
                    if (cell) {
                        _this._formatCell(cell, item_2, col, true);
                    }
                });
            }
        };
        var this_1 = this;
        for (var symbol in changedItems) {
            _loop_1(symbol);
        }
    };
    // add a value to a history array
    AppCmp.prototype._addHistory = function (array, data) {
        array.push(data);
        if (array.length > 10) {
            array.splice(0, 1);
        }
    };
    // custom cell painting
    AppCmp.prototype._formatCell = function (cell, item, col, flare) {
        if (this.customCells) {
            switch (col.binding) {
                case 'bid':
                    this._formatDynamicCell(cell, item, col, 'bidHistory', flare);
                    break;
                case 'ask':
                    this._formatDynamicCell(cell, item, col, 'askHistory', flare);
                    break;
                case 'lastSale':
                    this._formatDynamicCell(cell, item, col, 'saleHistory', flare);
                    break;
                default:
                    cell.textContent = wjcCore.Globalize.format(item[col.binding], col.format);
                    break;
            }
        }
        else {
            cell.textContent = wjcCore.Globalize.format(item[col.binding], col.format);
        }
    };
    AppCmp.prototype._formatDynamicCell = function (cell, item, col, history, flare) {
        // cell template
        var html = '<div class="ticker chg-{dir} flare-{fdir}"> ' +
            '<div class="value">{value}</div >' +
            '<div class="chg">{chg}</div>' +
            '<div class="glyph"><span class="wj-glyph-{glyph}"></span></div>' +
            '<div class="spark">{spark}</div>' +
            '</div>';
        // value
        html = html.replace('{value}', wjcCore.Globalize.format(item[col.binding], col.format));
        // % change
        var hist = item[history], chg = hist.length > 1 ? hist[hist.length - 1] / hist[hist.length - 2] - 1 : 0;
        html = html.replace('{chg}', wjcCore.Globalize.format(chg * 100, 'n1') + '%');
        // up/down glyph
        var glyph = chg > +0.001 ? 'up' : chg < -0.001 ? 'down' : 'circle';
        html = html.replace('{glyph}', glyph);
        // sparklines
        html = html.replace('{spark}', this._getSparklines(item[history]));
        // change direction
        var dir = glyph == 'circle' ? 'none' : glyph;
        html = html.replace('{dir}', dir);
        // flare direction
        var flareDir = flare ? dir : 'none';
        html = html.replace('{fdir}', flareDir);
        // done
        cell.innerHTML = html;
    };
    // generate sparklines as SVG
    AppCmp.prototype._getSparklines = function (data) {
        var svg = '', min = Math.min.apply(Math, data), max = Math.max.apply(Math, data), x1 = 0, y1 = this._scaleY(data[0], min, max);
        for (var i = 1; i < data.length; i++) {
            var x2 = Math.round((i) / (data.length - 1) * 100), y2 = this._scaleY(data[i], min, max);
            svg += '<line x1=' + x1 + '% y1=' + y1 + '% x2=' + x2 + '% y2=' + y2 + '% />';
            x1 = x2;
            y1 = y2;
        }
        return '<svg><g>' + svg + '</g></svg>';
    };
    AppCmp.prototype._scaleY = function (value, min, max) {
        return max > min ? 100 - Math.round((value - min) / (max - min) * 100) : 0;
    };
    __decorate([
        core_1.ViewChild('theGrid')
    ], AppCmp.prototype, "theGrid", void 0);
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
            imports: [wijmo_angular2_grid_1.WjGridModule, wijmo_angular2_input_1.WjInputModule, forms_1.FormsModule, platform_browser_1.BrowserModule],
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