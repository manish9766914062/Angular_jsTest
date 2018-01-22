import  { Pipe, PipeTransform } from '@angular/core'
import {IEvent} from '../models/ievent'

@Pipe({
    name: 'eventStartDateFilter'
})
// for pipe args are passed by : instead of ,
export class EventStartDateFilterPipe implements PipeTransform
{
    transform(value: IEvent[], ...args: any[]): IEvent[]
    {
        //console.log(value);
        //console.log(args[0]);
        
        let filter:Date = args[0] ? new Date(args[0]): args[0];
        console.log(filter);        

        return filter ? value.filter(function(event:IEvent) {
            //console.log(new Date(event.startDate));

            if(event.startDate.getDay() == filter.getDay() 
                && event.startDate.getMonth() == filter.getMonth()
                && event.startDate.getFullYear() == filter.getFullYear())
                {
                    //console.log('condition is true');
                    return event.startDate;
                }
            
        }) : value;
    }
}