'use strict';

import { Injectable } from '@angular/core';
// provide access to breeze
declare var breeze: any;
declare var logger: any;
// Common data service
@Injectable()
export class DataSvc {
    static manager: any;
    init() {
        if (!DataSvc.manager) {
            // backingStore is the modelLibrary for Angular
            breeze.config.initializeAdapterInstance('modelLibrary', 'backingStore', true);
            // route to the (same origin) Web Api controller
            let serviceName = 'breeze/WijmoNxtNorthBreeze';

            // gets metadata from /breeze/NorthBreeze/Metadata
            DataSvc.manager = new breeze.EntityManager(serviceName);
        }
    }

    //define all the functions exposed in this service.
    getManager() {
        return DataSvc.manager;
    }

    getEntityQuery(tableName: string) {
        return breeze.EntityQuery.from(tableName);
    }

    getCompanyNamePredicate(companyName: string) {
        return companyName
            ? new breeze.Predicate('CompanyName', 'contains', companyName)
            : null;
    }

    querySucceeded(entityCount: number) {
        logger.info('Fetched ' + entityCount + ' Customers ');
    }
    queryFailed(errorMsg: string) {
        logger.error(errorMsg, 'Query failed');
    }
    saveSucceeded(saveResult: any) {
        logger.success('# of entities saved = ' + saveResult.entities.length);
        logger.log(saveResult);
    }
    saveFailed(error: any) {
        var reason = error.message;
        var detail = error.detail;
        var entityErrors = error.entityErrors;

        if (entityErrors && entityErrors.length) {
            this._handleSaveValidationError(entityErrors);
            return;
        }
        if (detail && detail.ExceptionType &&
            detail.ExceptionType.indexOf('OptimisticConcurrencyException') !== -1) {
            // Concurrency error 
            reason =
                'Another user, perhaps the server, may have deleted one or all of the same entities.';
            DataSvc.manager.rejectChanges(); // DEMO ONLY: discard all pending changes
        }

        logger.error(error,
            'Failed to save changes. ' + reason +
            ' You may have to restart the app.');
    }
    private _handleSaveValidationError(entityErrors: any) {
        // http://www.breezejs.com/documentation/server-side-validation
        var message = 'Not saved due to validation errors';
        try {
            // fish out the first error
            var messages = entityErrors.map(function (er) {
                return er.errorMessage;
            });
            message += ': ' + messages.join(';\n');
        } catch (e) { /* eat it for now */ }
        logger.error(message);
    }
}