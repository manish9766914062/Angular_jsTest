import { IEmployee } from './iemployee'

export class Employee implements IEmployee
{
    constructor(public employeeId:number, public employeeName:string, public address:string, public city:string, public phone:string, public email:string, public avtar:string)
    {

    }
}