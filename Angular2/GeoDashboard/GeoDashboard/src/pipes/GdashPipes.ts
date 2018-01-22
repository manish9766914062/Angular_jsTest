import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'latitude' })
export class LatitudePipe implements PipeTransform {
    transform(value: number, exponent: number): string {
        if (!exponent) exponent = 0;
        value = value * 1;
        var ns = value > 0 ? 'N' : 'S';
        value = Math.abs(value);
        var deg = Math.floor(value);
        var min = Math.floor((value - deg) * 60);
        var sec = ((value - deg - min / 60) * 3600).toFixed(exponent);
        return deg + '°' + min + '\'' + sec + '"' + ns;
    }
}

@Pipe({ name: 'longitude' })
export class LongitudePipe implements PipeTransform {
    transform(value: number, exponent: number): string {
        if (!exponent) exponent = 0;
        value = value * 1;
        var ew = value > 0 ? 'E' : 'W';
        value = Math.abs(value);
        var deg = Math.floor(value);
        var min = Math.floor((value - deg) * 60);
        var sec = ((value - deg - min / 60) * 3600).toFixed(exponent);
        return deg + '°' + min + '\'' + sec + '"' + ew;
    }
}