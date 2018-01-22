import { NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { RouterModule } from '@angular/router'

//Component
import { MenuBarComponent } from './components/menu-bar.component'
import { SepFooterComponent } from './components/sep-footer.component'

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [
        MenuBarComponent,
        SepFooterComponent
    ],
    providers: [],
    exports: [
        MenuBarComponent,
        SepFooterComponent
    ]
})
export class NavigationModule { }