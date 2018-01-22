import { ElementRef, AfterViewInit } from '@angular/core';
export declare class AppSorter implements AfterViewInit {
    elRef: ElementRef;
    view: any;
    binding: string;
    header: string;
    constructor(elRef: ElementRef);
    ngAfterViewInit(): void;
    updateSortIndicator(element: any): void;
    applySort(args: any): void;
}
