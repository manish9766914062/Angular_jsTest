export declare class DataSvc {
    static manager: any;
    init(): void;
    getManager(): any;
    getEntityQuery(tableName: string): any;
    getCompanyNamePredicate(companyName: string): any;
    querySucceeded(entityCount: number): void;
    queryFailed(errorMsg: string): void;
    saveSucceeded(saveResult: any): void;
    saveFailed(error: any): void;
    private _handleSaveValidationError(entityErrors);
}
