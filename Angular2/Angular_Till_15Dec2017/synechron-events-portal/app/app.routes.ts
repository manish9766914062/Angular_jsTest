import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
import { HomeComponent } from './home/components/home-component'
import { EventListComponent} from './events/components/events-list.component'
import { HrTeamComponent } from './hr/components/hrTeam-list.component'
import { EmployeesListComponent } from './employees/components/employee-list.component'
import { EventDetailsComponent } from './events/components/event-details.component'
import { EmployeeDetailsComponent } from './employees/components/employee-details.component'

const appRouteConfig: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'events',
        component: EventListComponent
    },
    {
        path: 'employees',
        component: EmployeesListComponent
    },
    {
        path: 'hr',
        component: HrTeamComponent
    },
    {
        path: 'events/:eventId',
        component: EventDetailsComponent
    },
    {
        path: 'employees/:employeeId',
        component: EmployeeDetailsComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRouteConfig);