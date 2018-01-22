import {Injectable} from '@angular/core';
import {Event} from '../models/event';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'; // ,ap is a oprator which is used for select (just like sql select)

@Injectable()
export class EventsService
{
    
    /*private _eventData:Event[] = [
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
    ]*/
    
    // getAllEvents():Event[]
    // {
    //     return this._eventData;
    // }

    // getSingleEvent(id:number):Event
    // {
    //     let selectedEvent:Event = new Event();
    //     for(let event of this._eventData)
    //     {
    //         if (event.eventId == id)
    //         {
    //             selectedEvent = event
    //             break;
    //         }
    //     }

    //     return selectedEvent;
    // }

    constructor (private _htpp:Http)
    {

    }

    getAllEvents(): Observable<Event[]>
    {
        return this._htpp.get("http://localhost:9090/api/events").map(res => res.json());
    }

    getSingleEvent(id:number): Observable<Event>
    {
        return this._htpp.get(`http://localhost:9090/api/events/${id}`).map(res => res.json());
    }
}