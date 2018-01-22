'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// Common data service
var DataSvc = /** @class */ (function () {
    function DataSvc() {
    }
    DataSvc_1 = DataSvc;
    DataSvc.prototype.init = function () {
        if (!DataSvc_1.manager) {
            // backingStore is the modelLibrary for Angular
            breeze.config.initializeAdapterInstance('modelLibrary', 'backingStore', true);
            // route to the (same origin) Web Api controller
            var serviceName = 'breeze/WijmoNxtNorthBreeze';
            // gets metadata from /breeze/NorthBreeze/Metadata
            DataSvc_1.manager = new breeze.EntityManager(serviceName);
        }
    };
    //define all the functions exposed in this service.
    DataSvc.prototype.getManager = function () {
        return DataSvc_1.manager;
    };
    DataSvc.prototype.getEntityQuery = function (tableName) {
        return breeze.EntityQuery.from(tableName);
    };
    DataSvc.prototype.getCompanyNamePredicate = function (companyName) {
        return companyName
            ? new breeze.Predicate('CompanyName', 'contains', companyName)
            : null;
    };
    DataSvc.prototype.querySucceeded = function (entityCount) {
        logger.info('Fetched ' + entityCount + ' Customers ');
    };
    DataSvc.prototype.queryFailed = function (errorMsg) {
        logger.error(errorMsg, 'Query failed');
    };
    DataSvc.prototype.saveSucceeded = function (saveResult) {
        logger.success('# of entities saved = ' + saveResult.entities.length);
        logger.log(saveResult);
    };
    DataSvc.prototype.saveFailed = function (error) {
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
            DataSvc_1.manager.rejectChanges(); // DEMO ONLY: discard all pending changes
        }
        logger.error(error, 'Failed to save changes. ' + reason +
            ' You may have to restart the app.');
    };
    DataSvc.prototype._handleSaveValidationError = function (entityErrors) {
        // http://www.breezejs.com/documentation/server-side-validation
        var message = 'Not saved due to validation errors';
        try {
            // fish out the first error
            var messages = entityErrors.map(function (er) {
                return er.errorMessage;
            });
            message += ': ' + messages.join(';\n');
        }
        catch (e) { }
        logger.error(message);
    };
    DataSvc = DataSvc_1 = __decorate([
        core_1.Injectable()
    ], DataSvc);
    return DataSvc;
    var DataSvc_1;
}());
exports.DataSvc = DataSvc;
//# sourceMappingURL=DataSvc.js.map