import {Component} from '@angular/core';

@Component({
    selector: 'sep-footer',
    templateUrl : '../views/sep-footer.component.html'
})
export class SepFooterComponent
{
    copyRight:string="All rights are reserved by Synechron Pvt. Ltd. Year - " + new Date().getFullYear();
    footerLink:string[] = [
        "Sitemap",
        "Policy",
        "Feedback",
        "Developer Team"
    ]
}