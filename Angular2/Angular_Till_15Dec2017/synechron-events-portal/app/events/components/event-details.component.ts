//import {Component,Input/*,Output,EventEmitter*/, OnChanges} from '@angular/core';//Output,EventEmitter goes together
import {Component,OnInit} from '@angular/core'; //for routing to work
import {Event} from  '../models/event'
import {EventsService} from '../services/events-service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'event-details',
    templateUrl : '../views/event-details.component.html'
})
export class EventDetailsComponent implements OnInit //OnChanges
{
    //it is constuctor injection as angular has in-built dependency injection and follows constuctor injection
    constructor(private _eventsService:EventsService, private _route:ActivatedRoute, private _routerPath: Router)  //for angular service
    {
        
    }

    pageTitle:string = "Details of - ";
    
    //@Input("event") receivedEvent:Event; // making this property as input to parent component
    //@Input("eventId") id:number; // now using router
    receivedEvent:Event;

    // anything giving Observable, we have to subscribe them
    /*ngOnChanges(): void
    {
        //this.receivedEvent = this._eventsService.getSingleEvent(this.id);
        this._eventsService.getSingleEvent(this.id).subscribe(
            data => this.receivedEvent = data,
            err => console.log(err),
            () => console.log("Service call completed")
        );
    }*/
    ngOnInit(): void
    {
        let id: number = 0;

        this._route.params.subscribe(
            params => id = params["eventId"]
        );

        this._eventsService.getSingleEvent(id).subscribe(
            data => this.receivedEvent = data,
            err => console.log(err),
            () => console.log("Service call completed")
        );
    }

    //confirmation:EventEmitter<Employee>

    // //to send data to parent component
    // @Output("sendConfirmation") confirmation:EventEmitter<string> = new EventEmitter<string>();

    // raiseEvent():void
    // {
    //     this.confirmation.emit("Sucsessfully received Employee data and stored in DB!");
    // }

    GoBack():void
    {
        this._routerPath.navigateByUrl("/events");
    }
}