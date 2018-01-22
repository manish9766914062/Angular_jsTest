import * as wjcCore from 'wijmo/wijmo';
import * as wjcGridFilter from 'wijmo/wijmo.grid.filter';
/**
 * Extends @see:CollectionView to support Breeze.
 *
 * Breeze is a JavaScript library that helps you manage data in rich client applications.
 * It makes it easier to  store data in a database, query and save those data as complex object
 * graphs, and share these graphs across multiple screens of your JavaScript client.
 * You can find out more about BreezeJS at http://www.breezejs.com.
 */
export declare class BreezeCollectionView extends wjcCore.CollectionView {
    _manager: any;
    _entityQuery: any;
    _sortOnServer: boolean;
    _filterOnServer: boolean;
    _pageOnServer: boolean;
    _filterPredicate: any;
    _totalCount: number;
    _isSaving: boolean;
    /**
    * Initializes a new instance of an @see:BreezeCollectionView.
    *
    * @param breezeEntityManager Entity manager for breeze service.
    * @param entityQuery Breeze entity query.
    * @param sortOnServer Whether to sort on the server or on the client.
    * @param pageOnServer Whether to page on the server or on the client.
    * @param filterOnServer Whether to filter on the server or on the client.
    */
    constructor(breezeEntityManager: any, entityQuery: any, sortOnServer?: boolean, pageOnServer?: boolean, filterOnServer?: boolean);
    /**
     * Overridden to get the total number pages.
     */
    readonly pageCount: number;
    /**
     * Overridden to get or set the number of items to display on a page.
     */
    pageSize: number;
    /**
     * Overridden to move to the page at the specified index.
     *
     * @param index Index of the page to move to.
     * @return True if the page index was changed successfully.
     */
    moveToPage(index: number): boolean;
    /**
     * Overridden to modify the item in the database.
     */
    commitEdit(): void;
    /**
     * Gets or sets a value indicating whether to sort on the server or on the client.
     */
    sortOnServer: boolean;
    /**
     * Gets or sets a value indicating whether to perform paging on the server or on the client.
     */
    pageOnServer: boolean;
    /**
     * Gets or sets a value indicating whether to perform filtering on the server or on the client.
     */
    filterOnServer: boolean;
    /**
     * Gets the total count of source items.
     */
    readonly totalCount: number;
    /**
     * Gets or sets the filter definition as a Breeze filter Predicate.
     */
    filterPredicate: any;
    /**
     * Updates the filter definition based on a known filter provider such as the
     * @see:wijmo.grid.FlexGridFilter.
     *
     * @param filterProvider Known filter provider, typically an instance of a
     * @see:wijmo.grid.filter.FlexGridFilter.
     */
    updateFilterDefinition(filterProvider: any): void;
    /**
     * Occurs when the breeze query succeeds.
     */
    querySucceeded: wjcCore.Event;
    /**
     * Raises the @see:querySucceeded event.
     *
     * @param e indicates the query data count.
     */
    onQuerySucceeded(e: QueryEventArgs): void;
    /**
     * Occurs when the breeze query fails.
     */
    queryFailed: wjcCore.Event;
    /**
     * Raises the @see:queryFailed event.
     *
     * @param e indicates the fail information.
     */
    onQueryFailed(e: QueryEventArgs): void;
    /**
     * Occurs when the save request success.
     */
    saveSucceeded: wjcCore.Event;
    /**
     * Raises the @see:onSaveSucceeded event.
     *
     * @param e indicates the success information.
     */
    onSaveSucceeded(e: QueryEventArgs): void;
    /**
     * Occurs when the save request fails.
     */
    saveFailed: wjcCore.Event;
    /**
     * Raises the @see:onSaveFailed event.
     *
     * @param e indicates the fail information.
     */
    onSaveFailed(e: QueryEventArgs): void;
    _getPageView(): any[];
    _performRefresh(): void;
    private _queryData();
    private _querySucceeded(data);
    private _queryFailed(error);
    private _getServerSortQuery(query);
    private _getServerPageQuery(query);
    private _getServerFilterQuery(query);
    private _sortDescHandler();
    private _saveChanges(entities);
    private _saveSucceeded(saveResult);
    private _saveFailed(error);
    private _saveFinished();
    _asPredicate(filter: wjcGridFilter.FlexGridFilter): any;
    private _asValueFilterPredicate(vf);
    private _asConditionFilterPredicate(cf);
    private _asConditionPredicate(cf, cond);
}
export declare class QueryEventArgs extends wjcCore.EventArgs {
    _data: any;
    constructor(data: any);
    readonly data: any;
}
