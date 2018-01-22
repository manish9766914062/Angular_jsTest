import { AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
export declare class AppCmp implements AfterViewInit {
    static CSS_WIJMO: string;
    static CSS_MDL: string;
    wijmoUrl: string;
    materialUrl: string;
    swijmoUrl: SafeResourceUrl;
    smaterialUrl: SafeResourceUrl;
    primary: string;
    accent: string;
    isEven: boolean;
    palette: ({
        name: string;
        outer: string;
        inner: string;
    } | {
        name: string;
        outer: string;
        inner: string;
        primary: boolean;
    })[];
    theNumber: number;
    theGaugeValue: number;
    theDateTime: Date;
    private _sanitizer;
    constructor(sanitizer: DomSanitizer);
    ngAfterViewInit(): void;
    themeChanged(s: any): void;
    downloadCss(): boolean;
    checkEven(num: number): void;
}
export declare class AppModule {
}
