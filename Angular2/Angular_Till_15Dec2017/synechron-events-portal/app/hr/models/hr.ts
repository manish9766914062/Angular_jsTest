import {IHr} from './ihr'

export class Hr implements IHr
{
    constructor(public Id: number,public Name: string, public phone: string, public email: string, public avtar: string)
    {

    }
}