import {Component} from '@angular/core';
//import {Home} from 'home/home-component';

@Component({
    selector: 'menu-bar',
    templateUrl : '../views/menu-bar.component.html'
})
export class MenuBarComponent
{
    menus: string[] = [
        "images/synlogo.png",
        "Home",
        "Events",
        "Employees",
        "Hr Team",
        "About Us",
        "Contact Us"
    ]
}