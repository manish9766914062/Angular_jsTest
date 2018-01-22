import {Component} from '@angular/core';
import {Hr} from '../models/hr';

@Component({
    selector: 'hr-list',
    templateUrl: '../views/hrTeam-list.component.html'
})
export class HrTeamComponent
{
    pageTitle:string = "Synechron Hr List!";
    subTitle:string = "Core Development Team!";
    //hr:Hr = new Employee(1234,"Shubhangi Meshram", "Dhanori", "Pune", "+91 1234567980", "shubhangi.meshram@synechron.com");
    hrsList:Hr[] = [
        {
            Id: 1234,
            Name:"Hr Shubhangi Meshram",
            phone: "+91 1234567980", 
            email: "shubhangi.meshram@synechron.com",
            avtar: "images/hrImage.jpg"
        },
        {
            Id: 1235,
            Name:"Hr Manish Meshram",
            phone: "+91 4568952361", 
            email: "manish.meshram@synechron.com",
            avtar: "images/index.jpg"
        },
        {
            Id: 1236,
            Name:"Hr Subhash Meshram",
            phone: "+91 7893541268", 
            email: "subhash.meshram@synechron.com",
            avtar: "images/Hr4.jpg"
        },
        {
            Id: 1237,
            Name:"Hr Shashikala Meshram",
            phone: "+91 7894561232", 
            email: "shashi.meshram@synechron.com",
            avtar: "images/Hr3.jpg"
        },
        {
            Id: 1238,
            Name:"Hr Sweety Meshram",
            phone: "+91 4762589643", 
            email: "sweety.meshram@synechron.com",
            avtar: "images/Hr1.jpg"
        }
    ];
    /*
    getSelectedHr(hr:Hr):void
    {
        this.selectedhr = hr;
        console.log(this.selectedhr);
    }
    */
}