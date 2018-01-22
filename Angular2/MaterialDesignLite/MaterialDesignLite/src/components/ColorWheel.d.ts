import * as wjcCore from 'wijmo/wijmo';
/**
 * Implements a color wheel similar to the one in the Material Design Lite customization page:
 * http://www.getmdl.io/customize/index.html#cdn-code
 */
export declare class ColorWheel extends wjcCore.Control {
    static _POINTERSIZE: number;
    static _PALINDEX: string;
    _palette: any[];
    _primary: number;
    _accent: number;
    _radius: number;
    _cx: number;
    _cy: number;
    _dSvg: HTMLDivElement;
    _svg: SVGSVGElement;
    _primaryPtr: SVGGElement;
    _accentPtr: SVGGElement;
    _tooltip: wjcCore.Tooltip;
    /**
        * Gets or sets the template used to instantiate @see:Gauge controls.
        */
    static controlTemplate: string;
    constructor(element: any, options?: any);
    palette: any[];
    primary: string;
    accent: string;
    themeChanged: wjcCore.Event;
    onThemeChanged(e?: wjcCore.EventArgs): void;
    refresh(fullUpdate?: boolean): void;
    _paletteIndex(color: string): number;
    _createWheel(): void;
    _click(index: number): void;
    _createSvgElement(tag: string): Element;
    _createSector(rStart: number, rEnd: number, color: string): SVGPathElement;
    _createPointer(caption: string): SVGGElement;
    _getSectorAngle(index: number): number;
    _themeChanged(): void;
    _updatePointer(ptr: SVGGElement, index: number): void;
}
