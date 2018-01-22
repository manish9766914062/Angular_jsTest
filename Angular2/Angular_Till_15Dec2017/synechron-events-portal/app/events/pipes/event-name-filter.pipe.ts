import  { Pipe, PipeTransform } from '@angular/core'
import {IEvent} from '../models/ievent'

@Pipe({
    name: 'eventNameContainsFilter'
})
// for pipe args are passed by : instead of ,
export class EventNameFilterPipe implements PipeTransform
{
    transform(value: IEvent[], ...args: any[]): IEvent[]
    {
        let filter:string = args[0] ? args[0].toLocaleLowerCase() : null;

        return filter ? value.filter(function(event:IEvent) {
           return event.eventName.toLocaleLowerCase().indexOf(filter) != -1
        }) : value;

    }
}