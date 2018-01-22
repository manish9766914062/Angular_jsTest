import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    //template: `<h1>Welcome To Synechron Pvt. Ltd.</h1>
    //            <hr>
    //            <h4>Bangalore Development Division!</h4>`
    templateUrl:'app.component.html'
})
export class AppComponent { 
    pagetitle: string = "Welcome to Synechron Events Portal";
    subTitle: string = "Designed and maintained by HR Team!";
}
