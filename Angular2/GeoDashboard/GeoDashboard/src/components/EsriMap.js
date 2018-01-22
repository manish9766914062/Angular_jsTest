'use strict';
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
var core_1 = require("@angular/core");
var DdashService_1 = require("../services/DdashService");
var EsriMap = /** @class */ (function () {
    function EsriMap(elRef, gdashService) {
        this._map = null;
        this._resizingMap = false;
        this._map = this._createMap(elRef.nativeElement);
        this._gdashService = gdashService;
    }
    EsriMap.prototype.ngOnInit = function () {
        var _this = this;
        if (!this._map) {
            return;
        }
        // initialize map extent
        if (!this.extent) {
            this.extent = new esri.geometry.Extent({
                xmin: -10392864, ymin: 4444140,
                xmax: -7423438, ymax: 5422534,
                spatialReference: { wkid: 102100 }
            });
        }
        window.addEventListener('resize', function () { _this._resizingMap = true; });
        // keep scope and map centers in sync
        this._map.onPanEnd = function () {
            _this._updateScopeExtent(false);
            _this.extent = _this._gdashService.currentExtent;
        };
        this._map.onZoomEnd = function () {
            _this._updateScopeExtent(true);
        };
        this._map.onExtentChange = function () {
            if (_this._resizingMap) {
                _this._resizingMap = false;
                _this._updateScopeExtent(true);
            }
        };
    };
    Object.defineProperty(EsriMap.prototype, "extent", {
        get: function () {
            return this._extent;
        },
        set: function (value) {
            if (!this._map) {
                return;
            }
            if (this._extent !== value) {
                this._extent = value;
                this._map.setExtent(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EsriMap.prototype, "tileSource", {
        get: function () {
            return this._tileSource;
        },
        set: function (source) {
            if (!this._map) {
                return;
            }
            this._tileSource = source;
            if (source) {
                this._showTiles(source);
            }
            else {
                var ids = this._map.layerIds;
                if (ids.length > 0) {
                    var layer = this._map.getLayer(ids[0]);
                    layer.setVisibility(true);
                    for (var i = 1; i < ids.length; i++) {
                        layer = this._map.getLayer(ids[i]);
                        layer.setVisibility(false);
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EsriMap.prototype, "basemap", {
        get: function () {
            return this._basemap;
        },
        set: function (value) {
            if (!this._map) {
                return;
            }
            this._basemap = value;
            if (this._basemap && this._map.getBasemap() !== this._basemap) {
                this._map.setBasemap(this._basemap);
            }
        },
        enumerable: true,
        configurable: true
    });
    // create the map
    EsriMap.prototype._createMap = function (element) {
        if (!esri.Map) {
            return;
        }
        // give element a unique id
        var elementId = element['id'];
        if (!elementId) {
            elementId = 'map' + DdashService_1.DashService.MAPID++;
            element['id'] = elementId;
        }
        // create the map
        var options = {
            wrapAround180: true,
            fadeOnZoom: true,
            showAttribution: false,
            navigationMode: 'css-transforms',
            extent: this.extent,
            basemap: this.basemap ? this.basemap : 'national-geographic'
        };
        var map = new esri.Map(elementId, options);
        // disable zoom on mouse wheel (only works after the map has loaded)
        dojo.connect(map, 'onLoad', function () {
            map.disableScrollWheelZoom();
        });
        // change animation durations
        var cfg = esriConfig.defaults.map;
        cfg.panDuration = 50; // time in milliseconds; default panDuration: 350
        cfg.zoomDuration = 50; // time in milliseconds; default panDuration: 500
        // done
        return map;
    };
    // update scope extent after user zooms/pans/resizes the map
    EsriMap.prototype._updateScopeExtent = function (keepCenter) {
        if (keepCenter && this.extent) {
            var center = this.extent.getCenter();
            this._map.centerAt(center);
        }
        this._gdashService.setExtent(this._map.extent);
    };
    // show tile layer
    EsriMap.prototype._showTiles = function (source) {
        // get tile url
        var url = source ? source.getTileUrl() : '';
        // create new tile layer if necessary
        if (url) {
            var layer = this._map.getLayer(url);
            if (!layer) {
                layer = new esri.layers.ArcGISTiledMapServiceLayer(url);
                layer.id = url;
                layer.opacity = 0.4;
                this._map.addLayer(layer);
            }
        }
        // set tile layer visibility
        var ids = this._map.layerIds;
        for (var i = 1; i < ids.length; i++) {
            var layer = this._map.getLayer(ids[i]);
            layer.setVisibility(layer.id == url);
        }
    };
    __decorate([
        core_1.Input()
    ], EsriMap.prototype, "extent", null);
    __decorate([
        core_1.Input()
    ], EsriMap.prototype, "tileSource", null);
    __decorate([
        core_1.Input()
    ], EsriMap.prototype, "basemap", null);
    EsriMap = __decorate([
        core_1.Component({
            selector: 'esri-map',
            template: '<div class="tab-content"><ng-content></ng-content></div>'
        }),
        __param(0, core_1.Inject(core_1.ElementRef)), __param(1, core_1.Inject(DdashService_1.DashService))
    ], EsriMap);
    return EsriMap;
}());
exports.EsriMap = EsriMap;
//# sourceMappingURL=EsriMap.js.map