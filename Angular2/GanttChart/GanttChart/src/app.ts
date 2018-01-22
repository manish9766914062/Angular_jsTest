import * as wjcCore from 'wijmo/wijmo';
import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcInput from 'wijmo/wijmo.input';

// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjChartModule } from 'wijmo/wijmo.angular2.chart';

import { DataSvc } from './services/DataSvc';

    'use strict';

    // The Explorer application root component.
    @Component({
        selector: 'app-cmp',
        templateUrl: 'src/app.html'
    })


    export class AppCmp {
        // generate some random data
        data: { name: string, start: Date, end: Date }[];
        depData: { name: string, start: Date, end: Date, parent: string, percent: number }[];
        private tasks = [];

        protected dataSvc: DataSvc;

        constructor( @Inject(DataSvc) dataSvc: DataSvc) {
            this.dataSvc = dataSvc;
            this.data = this.dataSvc.getData(5);
            this.depData = this.dataSvc.getDepData();
        }

        // utilities
        getTooltipContent(ht) {
            var str = wjcCore.format('<b>{name}</b>:<br/>{start:d} - {end:d}', {
                name: ht.x,
                start: ht.item.start,
                end: ht.item.end
            });
            if (ht.item && ht.item.percent != null) {
                str += wjcCore.format('<br/><i>percent complete: {percent}%</i>', ht.item);
            }
            return str;
        }

        // show the percentage complete for each task
        ganttItemFormatter = (engine, hti, defaultFormatter) => {

            // draw the item as usual
            defaultFormatter();

            // show percentage done
            var task = hti.item;
            if (wjcCore.isNumber(task.percent) && task.percent > 0) {
                var pct = wjcCore.clamp(task.percent, 0, 100) / 100,
                    rc = this.getTaskRect(hti.series.chart, task).inflate(-8, -8);
                engine.fill = pct == 1 ? 'green' : 'gold';//engine.stroke;
                engine.drawRect(rc.left, rc.top, rc.width * pct, rc.height);
            }
        }

        // show the task dependencies
        ganttChartRendered(chart, e) {
            var self = this,
                tasks = chart.collectionView.items;
            tasks.forEach(function (task) { // for each task
                var parents = self.getTaskParents(task, tasks); // get the parent tasks
                parents.forEach(function (parent) { // for each parent
                    self.drawConnectingLine(e.engine, chart, task, parent); // draw connector
                });
            });
        }
        drawConnectingLine(engine, chart, task, parent) {
            var rc1 = this.getTaskRect(chart, parent),   // parent rect
                rc2 = this.getTaskRect(chart, task),     // task rect
                x1 = rc1.left + rc1.width / 2,      // parent x center
                x2 = rc2.left,                      // task left
                y1 = rc1.bottom,                    // parent bottom
                y2 = rc2.top + rc2.height / 2;      // task y center

            // draw connecting line
            var xs = [x1, x1, x2],
                ys = [y1, y2, y2];
            engine.drawLines(xs, ys, 'connector', {
                stroke: 'black'
            });

            // draw arrow at the end
            var sz = 5;
            xs = [x2 - 2 * sz, x2, x2 - 2 * sz];
            ys = [y2 - sz, y2, y2 + sz];
            engine.drawPolygon(xs, ys, 'arrow', {
                fill: 'black'
            })
        }
        getTaskRect(chart, task) {
            var x1 = chart.axisX.convert(task.start),
                x2 = chart.axisX.convert(task.end),
                index = chart.collectionView.items.indexOf(task),
                y1 = chart.axisY.convert(index - .35),
                y2 = chart.axisY.convert(index + .35);
            return new wjcCore.Rect(x1, y1, x2 - x1 + 1, y2 - y1 + 1);
        }
        getTaskParents(task, tasks) {
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
        }

        ganttFormatter = (engine, hti, fn) => {
            fn();
            let chart = hti._chart,
                pt = hti.point,
                item = hti.item;

            let x1 = chart.axisX.convert(item.start);
            let x2 = chart.axisX.convert(item.end);
            //0.35 is half height of 0.7 which is the bar height.
            let offY = Math.abs(chart.axisY.convert(0) - chart.axisY.convert(0.35))
            let y = pt.y + offY;
            let y2 = pt.y - offY;
            let per = item.percent;
            let seriesGroup = chart.hostElement.querySelector('.wj-series-group');

            if (per && per > 0) {
                if (per > 100) {
                    per = 100;
                }
                let x = x1 + (x2 - x1) * per / 100;
                engine.fill = engine.stroke;
                engine.drawRect(x1, y2, x - x1, offY * 2);
            }
            
            if (this.tasks.length > 0) {
                this.tasks.forEach((task, i) => {
                    let parents = task.parent.split(',');
                    if (parents && parents.length > 0) {
                        let pIdx = -1;
                        parents.some((p, j) => {
                            if (p === hti.x) {
                                pIdx = j;
                                return true;
                            }
                        });
                        if (pIdx > -1) {
                            parents.splice(pIdx, 1);
                            task.parent = parents.join(',');

                            let pt = task.pt,
                                xs = [pt.x - 5, pt.x, pt.x - 5, pt.x, (x1 + x2) / 2, (x1 + x2) / 2],
                                ys = [pt.y - 5, pt.y, pt.y + 5, pt.y, pt.y, y];
                            let el = engine.drawLines(xs, ys, 'connector', { stroke: '#000000' });
                            //move connector line to before bar to prevent line covering bar elements.
                            seriesGroup.insertBefore(el, seriesGroup.firstChild);
                        }
                    }
                });
                this.tasks = this.tasks.filter(task => task.parent.length > 0);
            }
            if (item.parent && item.parent.length > 0) {
                this.tasks.push({
                    parent: item.parent,
                    isCriticalPath: item.isCriticalPath,
                    pt: pt
                });
            }
        }
    }

    @NgModule({
        imports: [WjInputModule, WjChartModule, BrowserModule, FormsModule],
        declarations: [AppCmp],
        providers: [DataSvc],
        bootstrap: [AppCmp]
    })
    export class AppModule {
    }


    enableProdMode();
    // Bootstrap application with hash style navigation and global services.
    platformBrowserDynamic().bootstrapModule(AppModule);
