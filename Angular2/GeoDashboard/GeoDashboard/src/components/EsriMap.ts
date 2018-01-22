'use strict';
declare var esri: any;
declare var dojo: any;
declare var esriConfig: any;

import {Component, Inject, Injector, ElementRef, Input, OnInit} from '@angular/core';
import { DashService } from '../services/DdashService';
@Component({
    selector: 'esri-map',
    template: '<div class="tab-content"><ng-content></ng-content></div>'

})
export class EsriMap implements OnInit {

    private _map = null;
    private _resizingMap = false;

    private _extent: any;
    private _tileSource: any;
    private _basemap: any;
    private _gdashService: DashService;
    constructor( @Inject(ElementRef) elRef: ElementRef, @Inject(DashService) gdashService: DashService) {
        this._map = this._createMap(elRef.nativeElement);
        this._gdashService = gdashService;
    }

    ngOnInit() {
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
        window.addEventListener('resize', () => { this._resizingMap = true; });
        // keep scope and map centers in sync
        this._map.onPanEnd = () => {
            this._updateScopeExtent(false);
            this.extent = this._gdashService.currentExtent;
        };
        this._map.onZoomEnd = () => {
            this._updateScopeExtent(true);
        };
        this._map.onExtentChange = () => {
            if (this._resizingMap) {
                this._resizingMap = false;
                this._updateScopeExtent(true);
            }
        };
    }

    @Input()
    get extent(): any {
        return this._extent;
    }
    set extent(value: any) {
        if (!this._map) {
            return;
        }
        if (this._extent !== value) {
            
            this._extent = value;
            this._map.setExtent(value);
            
        }
    }

    @Input()
    get tileSource(): any {
        return this._tileSource;
    }
    set tileSource(source: any) {
        if (!this._map) {
            return;
        }
        this._tileSource = source;
        if (source) {
            this._showTiles(source);
        } else {
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
    }

    @Input()
    get basemap(): any {
        return this._basemap;
    }
    set basemap(value: any) {
        if (!this._map) {
            return;
        }
        this._basemap = value;
        if (this._basemap && this._map.getBasemap() !== this._basemap) {
            this._map.setBasemap(this._basemap);
        }
    }


    // create the map
    private _createMap(element: HTMLElement) {
        if (!esri.Map) {
            return;
        }
        // give element a unique id
        var elementId = element['id'];
        if (!elementId) {
            elementId = 'map' + DashService.MAPID++;
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
        dojo.connect(map, 'onLoad', () => {
            map.disableScrollWheelZoom();
        });

        // change animation durations
        var cfg = esriConfig.defaults.map;
        cfg.panDuration = 50; // time in milliseconds; default panDuration: 350
        cfg.zoomDuration = 50; // time in milliseconds; default panDuration: 500

        // done
        return map;
    }

    // update scope extent after user zooms/pans/resizes the map
    private _updateScopeExtent(keepCenter: any) {
        if (keepCenter && this.extent) {
            var center = this.extent.getCenter();
            this._map.centerAt(center);
        }
        this._gdashService.setExtent(this._map.extent);
    }

    // show tile layer
    private _showTiles(source: any) {

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
    }
}



