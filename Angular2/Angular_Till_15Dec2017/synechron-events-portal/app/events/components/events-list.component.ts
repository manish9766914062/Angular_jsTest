//import {Component} from '@angular/core';
import {Component, OnInit} from '@angular/core'; //OnIt is for angular service
import {Event} from '../models/event';
import {EventsService} from '../services/events-service'

@Component({
    selector: 'events-list',
    templateUrl: '../views/events-list.component.html'
})
export class EventListComponent implements OnInit  //OnIt is for angular service
{
    //it is constuctor injection as angular has in-built dependency injection and follows constuctor injection
    constructor(private _eventsService:EventsService)  //for angular service
    {
        
    }

    pageTitle:string = "Synechron Future Events List";
    subTitle:string = "Published by Synechron HR Team!";
    
        // in later session, added it to service
        /*events:Event[] = [
            {
                eventId:123,
                eventCode:"JQ3SEM",
                eventName:"Jquery 3.x Seminar",
                description:"A day long Seminar on Jquery 3.x with all new features",
                startDate:new Date,
                endDate:new Date,
                fees:1000,
                attendance:70,
                logo:'images/jQuery.png'
            },
            {
                eventId:124,
                eventCode:"NG1SEM",
                eventName:"Angular JS 1.x Seminar",
                description:"A day long Seminar on Angular JS 1.x with all new features",
                startDate:new Date(2017,5,26),
                endDate:new Date,
                fees:1200,
                attendance:50,
                logo:'images/angularJs.png'
            },
            {
                eventId:125,
                eventCode:"NG2SEM",
                eventName:"Angular 2.x Seminar",
                description:"A day long Seminar on Angular 2.x with all new features",
                startDate:new Date(2017,5,26),
                endDate:new Date,
                fees:1500,
                attendance:50,
                logo:'images/angularJs.png'
            },
            {
                eventId:126,
                eventCode:"NG4SEM",
                eventName:"Angular 4.x Seminar",
                description:"A day long Seminar on Angular 4.x with all new features",
                startDate:new Date(2017,11,12),
                endDate:new Date,
                fees:1700,
                attendance:90,
                logo:'images/angularJs.png'
            },
            {
                eventId:127,
                eventCode:"NG5SEM",
                eventName:"Angular 5.x Seminar",
                description:"A day long Seminar on Angular 5.x with all new features",
                startDate:new Date,
                endDate:new Date,
                fees:2000,
                attendance:85,
                logo:'images/angular.png'
            },
            {
                eventId:128,
                eventCode:"BS3SEM",
                eventName:"Bootstrap 3.x Seminar",
                description:"A day long Seminar on Bootstrap 3.x with all new features",
                startDate:new Date,
                endDate:new Date,
                fees:2500,
                attendance:70,
                logo:'images/bootstrap.png'
            }
        ] */
    
    events:Event[] = [];

    ngOnInit():void   //for angular service
    {
        //this.events = this._eventsService.getAllEvents();
        this._eventsService.getAllEvents().subscribe(
            data => this.events = data,
            err => console.log(err),
            () => console.log("Service call completed")
        );
    }

    //selectedEvent:Event;
    // getSelectedEvent(event:Event):void
    // {
    //     this.selectedEvent = event;
    // }

    /**** Commented as we are using routing now ****/
    // selectedEventId:number;
    // getSelectedEvent(eventId:number):void
    // {
    //     //this.selectedEvent = this._eventsService.getSingleEvent(eventId);
    //     this.selectedEventId = eventId;
    // }
}