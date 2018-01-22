import * as wjcCore from 'wijmo/wijmo';
/**
 * Class used as a controller for the sortDescriptions collection of a
 * Wijmo 5 CollectionView class.
 */
export declare class SortManager {
    _view: wjcCore.ICollectionView;
    _props: string[];
    _sorts: wjcCore.CollectionView;
    /**
     * Sets the CollectionView being managed by this SortManager.
     *
     * @param view The CollectionView to be managed by this SortManager.
     * @param properties List of property names to expose for sorting.
     */
    setView(view: wjcCore.CollectionView, properties?: string[]): void;
    /**
     * Commits the current sort descriptions to the original CollectionView.
     */
    commit(save: boolean): void;
    /**
     * Gets a string describing problems with the current sort descriptions.
     */
    getError(): string;
    /**
     * Adds a blank sorting level to the sort descriptions.
     */
    addLevel(): void;
    /**
     * Removes the current sorting level from the sort descriptions.
     */
    removeLevel(): void;
    /**
     * Adds a copy of the current sorting level to the sort descriptions.
     */
    copyLevel(): void;
    /**
     * Moves the current sorting level to a new position.
     *
     * @param offset The offset to move the current level by.
     */
    moveLevel(offset: number): void;
    /**
     * Gets a list of the property names available for sorting by.
     */
    readonly properties: string[];
    /**
     * Gets a CollectionView with the current sort descriptions.
     */
    readonly sortDescriptions: wjcCore.ICollectionView;
}
