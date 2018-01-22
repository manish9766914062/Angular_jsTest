import {Component} from '@angular/core';

@Component({
    selector: 'home',
    templateUrl : '../views/home-component.html'
})
export class HomeComponent
{
    text:string="We combine innovative ideas with deep business knowledge and global technology teams to deliver business solutions."
    home:string[] =[
        "images/secondhome.png",
        "images/thirdhome.png",
        "images/firsthome.png"
    ];
}