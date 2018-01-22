export declare class InfoSource {
    shortUrl: string;
    trimName: string;
    values: any;
    list: any[];
    legends: any[];
    shortList: any[];
    URL_FORMAT: string;
    constructor(shortUrl: any, keys: any, listKeys?: any, trimName?: string);
    private getData(currentExtent, infoScale, serviceCallback);
    /**
 * After getting values from ESRI service, store them in this infoSource.
 */
    private gotData(featureSet, serviceCallback);
    /**
 * Get the location name for this info source.
 */
    getLocationName(): string;
    getTileUrl(): string;
    getQueryUrl(infoScale: string): string;
    getSchemaUrl(): string;
    legendExists(label: string): boolean;
    static getTapestryDescription(index: number): string;
    static convertColor(array: any[]): string;
}
export declare class infoValue {
    key: string;
    name: string;
    value: number;
    constructor(key: string, name: string);
}
