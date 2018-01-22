import { NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'

//Component
import { EmployeesListComponent } from './components/employee-list.component'
import { EmployeeDetailsComponent } from './components/employee-details.component'

//Service
import { EmployeesService } from './services/employees-service'

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule
    ],
    declarations: [
        EmployeesListComponent, 
        EmployeeDetailsComponent, 
    ],
    providers: [EmployeesService]//, // added here to make service available in all components
    // exports: [
    //     EmployeesListComponent, 
    //     EmployeeDetailsComponent, 
    // ]
})
export class EmployeesModule
{

}