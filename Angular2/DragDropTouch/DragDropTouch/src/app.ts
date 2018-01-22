import * as wjcCore from 'wijmo/wijmo';

// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjOlapModule } from 'wijmo/wijmo.angular2.olap';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjGridFilterModule } from 'wijmo/wijmo.angular2.grid.filter';
import { WjGridGrouppanelModule } from 'wijmo/wijmo.angular2.grid.grouppanel';

'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp implements AfterViewInit {
    data: any;

    private _dragSrcEl: HTMLElement;
    private _cols; any;

    constructor() {
        this.data = this._getData();
    }

    ngAfterViewInit() {
        this._cols = document.querySelectorAll('#columns .column');
        
        for (var i = 0; i < this._cols.length; i++) {
            let col = this._cols[i];
            col.addEventListener('dragstart', e => { this._handleDragStart(e) }, false);
            col.addEventListener('dragenter', e => { this._handleDragEnter(e) }, false)
            col.addEventListener('dragover', e => { this._handleDragOver(e) }, false);
            col.addEventListener('dragleave', e => { this._handleDragLeave(e) }, false);
            col.addEventListener('drop', e => { this._handleDrop(e) }, false);
            col.addEventListener('dragend', e => { this._handleDragEnd(e) }, false);
        }
    }
    private _handleDragStart(e) {
        if (wjcCore.hasClass(e.target, 'column')) {
            this._dragSrcEl = e.target;
            this._dragSrcEl.style.opacity = '0.4';
            var dt = e.dataTransfer;
            dt.effectAllowed = 'move';
            dt.setData('text', this._dragSrcEl.innerHTML);

            // customize drag image for one of the panels
            if (dt.setDragImage instanceof Function && e.target.innerHTML.indexOf('X') > -1) {
                var img = new Image();
                img.src = 'resources/dragimage.jpg';
                dt.setDragImage(img, img.width / 2, img.height / 2);
            }
        }
    }
    private _handleDragOver(e: any) {
        if (this._dragSrcEl) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        }
    }
    private _handleDragEnter(e: any) {
        if (this._dragSrcEl) {
            e.target.classList.add('over');
        }
    }
    private _handleDragLeave(e: any) {
        if (this._dragSrcEl) {
            e.target.classList.remove('over');
        }
    }
    private _handleDragEnd(e: any) {
        this._dragSrcEl = null;
        [].forEach.call(this._cols, function (col) {
            col.style.opacity = '';
            col.classList.remove('over');
        });
    }
    private _handleDrop(e: any) {
        if (this._dragSrcEl) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            e.preventDefault();
            if (this._dragSrcEl != e.target) {
                this._dragSrcEl.innerHTML = e.target.innerHTML;
                e.target.innerHTML = e.dataTransfer.getData('text');
            }
        }
    }

    private _getData() {
        var products = 'Alpina,Gumpert,Isdera,Keinath,Adler,Borgward'.split(','),
            countries = 'USA,UK,Japan,Germany'.split(','),
            data = [];
        for (var i = 0; i < 100; i++) {
            data.push({
                id: i,
                product: products[i % products.length],
                country: countries[i % countries.length],
                sales: Math.round(20 + Math.random() * 100),
                inquiries: Math.round(100 + Math.random() * 1000)
            })
        }
        return data;
    }
}


@NgModule({
    imports: [WjGridModule, WjOlapModule, WjGridFilterModule, WjGridGrouppanelModule, BrowserModule],
    declarations: [AppCmp],
    providers: [],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);