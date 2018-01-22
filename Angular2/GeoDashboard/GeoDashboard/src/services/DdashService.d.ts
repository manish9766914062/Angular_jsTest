export declare class DashService {
    infoSources: any;
    currentExtent: any;
    infoScale: number;
    locationName: string;
    domTapDescription: string;
    onGotData: any;
    dataTimer: any;
    static MAPID: number;
    getData(): void;
    gotData(): void;
    initService(gotDataCallback: Function): void;
    setExtent(extent: any): void;
    getLocation(): {
        lat: any;
        lon: any;
        name: string;
        isValid: boolean;
    };
    getIndexDescription(index: any): string;
    getSources(): any;
    getExtent(): any;
    getDomTapDescription(): string;
}
