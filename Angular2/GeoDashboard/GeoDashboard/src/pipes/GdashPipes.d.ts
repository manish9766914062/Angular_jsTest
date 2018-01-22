import { PipeTransform } from '@angular/core';
export declare class LatitudePipe implements PipeTransform {
    transform(value: number, exponent: number): string;
}
export declare class LongitudePipe implements PipeTransform {
    transform(value: number, exponent: number): string;
}
