import {Injectable} from '@angular/core';
import {Employee} from '../models/employee';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'; // ,ap is a oprator which is used for select (just like sql select)

@Injectable()
export class EmployeesService
{
    
    constructor (private _htpp:Http)
    {

    }

    getAllEmployees(): Observable<Employee[]>
    {
        return this._htpp.get("http://localhost:9090/api/employees").map(res => res.json());
    }

    getSingleEmployee(id:number): Observable<Employee>
    {
        return this._htpp.get(`http://localhost:9090/api/employees/${id}`).map(res => res.json());
    }
}