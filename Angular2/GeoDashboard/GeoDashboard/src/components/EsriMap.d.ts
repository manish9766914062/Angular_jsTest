import { ElementRef, OnInit } from '@angular/core';
import { DashService } from '../services/DdashService';
export declare class EsriMap implements OnInit {
    private _map;
    private _resizingMap;
    private _extent;
    private _tileSource;
    private _basemap;
    private _gdashService;
    constructor(elRef: ElementRef, gdashService: DashService);
    ngOnInit(): void;
    extent: any;
    tileSource: any;
    basemap: any;
    private _createMap(element);
    private _updateScopeExtent(keepCenter);
    private _showTiles(source);
}
