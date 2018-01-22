import { NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';

//Component
import { HrTeamComponent } from './components/hrTeam-list.component'

@NgModule({
    imports: [CommonModule],
    declarations: [HrTeamComponent],
    providers: []//,
    //exports: [HrTeamComponent]
})
export class HrModule { }