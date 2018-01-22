import {Component, OnInit} from '@angular/core';
import {Employee} from  '../models/employee'
import {EmployeesService} from '../services/employees-service'

@Component({
    selector: 'employee-list',
    templateUrl : '../views/employee-list.component.html'
})
export class EmployeesListComponent
{
    pageTitle:string = "Synechron Employees List!";
    subTitle:string = "Core Development Team!";
    childMessage:string ="";
    employees:Employee[] = [];

    constructor(private _employeesService:EmployeesService)  //for angular service
    {
        
    }

    ngOnInit():void   //for angular service
    {
        this._employeesService.getAllEmployees().subscribe(
            data => this.employees = data,
            err => console.log(err),
            () => console.log("Service call completed")
        );
    }

    // selectedEmployeeId:number;
    // getSelectedEmployeeId(employeeId:number):void
    // {
    //     this.selectedEmployeeId = employeeId;
    // }

    //employee:Employee = new Employee(1234,"Shubhangi Meshram", "Dhanori", "Pune", "+91 1234567980", "shubhangi.meshram@synechron.com");
    /*employeesList:Employee[] = [
        {
            employeeId: 1234,
            employeeName:"Shubhangi Meshram",
            address:"Dhanori", 
            city: "Pune", 
            phone: "+91 1234567980", 
            email: "shubhangi.meshram@synechron.com",
            avtar: "images/noImage.png"
        },
        {
            employeeId: 1235,
            employeeName:"Manish Meshram",
            address:"Dhanori", 
            city: "Pune", 
            phone: "+91 4568952361", 
            email: "manish.meshram@synechron.com",
            avtar: "images/noImage.png"
        },
        {
            employeeId: 1236,
            employeeName:"Subhash Meshram",
            address:"Ajni", 
            city: "Nagpur", 
            phone: "+91 7893541268", 
            email: "subhash.meshram@synechron.com",
            avtar: "images/noImage.png"
        },
        {
            employeeId: 1237,
            employeeName:"Shashikala Meshram",
            address:"Dharampeth", 
            city: "Nagpur", 
            phone: "+91 7894561232", 
            email: "shashi.meshram@synechron.com",
            avtar: "images/noImage.png"
        },
        {
            employeeId: 1238,
            employeeName:"Sweety Meshram",
            address:"Manewada", 
            city: "Nagpur", 
            phone: "+91 4762589643", 
            email: "sweety.meshram@synechron.com",
            avtar: "images/noImage.png"
        }
    ];
    //selectedEmployee:Employee;
    getSelectedEmployee(employee:Employee):void
    {
        this.selectedEmployee = employee;
        //console.log(this.selectedEmployee);
    }*/
    getChildMessage(message:string):void
    {
        this.childMessage = message;
    }
}