import { IEvent } from "./ievent";

export class Event implements IEvent
{
    eventId:number;
    eventCode:string;
    eventName:string;
    description:string;
    startDate:Date;
    endDate:Date;
    fees:number;
    attendance:number;
    logo:string;
}