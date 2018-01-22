/****** Optimized Way ******/
import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';

//Component
import { AppComponent } from './app.component';

//Module
import { HomeModule } from './home/home.module';
import { NavigationModule } from './navigation/navigation.module';
import { EmployeesModule } from './employees/employees.module';
import { EventsModule } from './events/events.module';
import { HrModule } from './hr/hr.module';

//Router
import { appRouting } from './app.routes'

@NgModule({
    imports: [
        BrowserModule,
        HomeModule,
        NavigationModule,
        EmployeesModule,
        EventsModule,
        HrModule,
        appRouting
    ],
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent], //components to be shown on UI
})
export class AppModule { }

/****** Old Way ******/
// import { NgModule } from '@angular/core';
// import { BrowserModule  } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';

// //Component
// import { AppComponent } from './app.component';
// import { EmployeesList } from './employees/components/employee-list.component'
// import { EmployeeDetailsComponent } from './employees/components/employee-details.component'
// import { HrTeam } from './hr/components/hrTeam-list.component'
// import { EventListComponent } from './events/components/events-list.component'
// import { EventDetailsComponent } from './events/components/event-details.component'
// import { MenuBarComponent } from './navigation/components/menu-bar.component'
// import { SepFooterComponent } from './navigation/components/sep-footer.component'
// import { HomeComponent } from './home/components/home-component'

// //Pipe
// import {FirstLetterCapitalPipe} from './events/pipes/first-letter-capital.pipe'
// import {EventNameFilterPipe} from './events/pipes/event-name-filter.pipe'
// import {EventStartDateFilterPipe} from './events/pipes/event-startdate-filter.pipe'

// //Service
// import {EventsService} from './events/services/events-service'
// import {EmployeesService} from './employees/services/employees-service'

// @NgModule({
//     imports: [
//         BrowserModule,
//         FormsModule,
//         HttpModule
//     ],
//     declarations: [
//         AppComponent, 
//         EmployeesList, 
//         EmployeeDetailsComponent, 
//         HrTeam, 
//         EventListComponent, 
//         EventDetailsComponent,
//         FirstLetterCapitalPipe,
//         EventNameFilterPipe,
//         EventStartDateFilterPipe,
//         MenuBarComponent,
//         SepFooterComponent,
//         HomeComponent
//     ],
//     providers: [EventsService,EmployeesService], // added here to make service available in all components
//     bootstrap: [AppComponent],
// })
// export class AppModule { }
