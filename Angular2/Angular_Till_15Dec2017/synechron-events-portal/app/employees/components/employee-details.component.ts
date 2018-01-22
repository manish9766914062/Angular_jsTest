//import {Component,Input,Output,EventEmitter, OnChanges} from '@angular/core';//Output,EventEmitter goes together
import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {Employee} from  '../models/employee'
import {EmployeesService} from '../services/employees-service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'employee-details',
    templateUrl : '../views/employee-details.component.html'
})
export class EmployeeDetailsComponent implements OnInit
{
    pageTitle:string = "Details of - ";
    //receivedEmployee:Employee = new Employee(1234,"Shubhangi Meshram", "Dhanori", "Pune", "+91 1234567980", "shubhangi.meshram@synechron.com", "images/noImage.png");
    //@Input("employee") receivedEmployee1:Employee; // making this property as input to parent component
    //in above name given to @Input function will act as alias for receivedEmployee
    //i.e instead of receivedEmployee can be used employee

    //confirmation:EventEmitter<Employee>
    //@Input("employeeId") id:number;
    receivedEmployee:Employee;

    constructor(private _employeesService:EmployeesService, private _route:ActivatedRoute, private _routePath:Router)  //for angular service
    {
        
    }

    // ngOnChanges(): void
    // {
    //     //this.receivedEvent = this._eventsService.getSingleEvent(this.id);
    //     this._employeesService.getSingleEmployee(this.id).subscribe(
    //         data => this.receivedEmployee = data,
    //         err => console.log(err),
    //         () => console.log("Service call completed")
    //     );
    // }
    ngOnInit(): void
    {
        let id: number = 0;
        this._route.params.subscribe(
            params => id = params["employeeId"]
        );

        this._employeesService.getSingleEmployee(id).subscribe(
            data => this.receivedEmployee = data,
            err => console.log(err),
            () => console.log("Service call completed")
        );
    }

    //to send data to parent component
    @Output("sendConfirmation") confirmation:EventEmitter<string> = new EventEmitter<string>();

    raiseEvent():void
    {
        this.confirmation.emit("Sucsessfully received Employee data and stored in DB!");
    }

    GoBack():void
    {
        //this._routePath.n("/employees");
        //this._routePath.navigate()
        this._routePath.navigateByUrl("/employees");
    }
}