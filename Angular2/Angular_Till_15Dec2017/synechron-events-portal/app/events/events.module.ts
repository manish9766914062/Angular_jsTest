import { NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'

//Component
import { EventListComponent } from './components/events-list.component'
import { EventDetailsComponent } from './components/event-details.component'

//Pipe
import { FirstLetterCapitalPipe } from './pipes/first-letter-capital.pipe'
import { EventNameFilterPipe } from './pipes/event-name-filter.pipe'
import { EventStartDateFilterPipe } from './pipes/event-startdate-filter.pipe'

//Service
import { EventsService } from './services/events-service'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        RouterModule
    ],
    declarations: [
        EventListComponent,
        EventDetailsComponent,
        FirstLetterCapitalPipe,
        EventNameFilterPipe,
        EventStartDateFilterPipe
    ],
    providers: [EventsService]//, // added here to make service available in all components
    // routing don't need it
    // exports: [
    //     EventListComponent,
    //     EventDetailsComponent
    // ]
})
export class EventsModule
{

}