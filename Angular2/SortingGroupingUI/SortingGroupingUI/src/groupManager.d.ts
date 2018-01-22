import * as wjcCore from 'wijmo/wijmo';
/**
 * Class used as a controller for the groupDescriptions collection of a
 * Wijmo 5 CollectionView class.
 */
export declare class GroupManager {
    _view: wjcCore.ICollectionView;
    _props: string[];
    _groups: wjcCore.CollectionView;
    /**
     * Sets the CollectionView being managed by this GroupManager.
     *
     * @param view The CollectionView to be managed by this GroupManager.
     * @param properties List of property names to expose for grouping by.
     */
    setView(view: wjcCore.CollectionView, properties?: string[]): void;
    /**
     * Commits the current group descriptions to the original CollectionView.
     */
    commit(save: boolean): void;
    /**
     * Gets a string describing problems with the current group descriptions.
     */
    getError(): string;
    /**
     * Adds a blank grouping level to the group descriptions.
     */
    addGroup(): void;
    /**
     * Removes the current group from the group descriptions.
     */
    removeGroup(): void;
    /**
     * Adds a copy of the current group to the group descriptions.
     */
    copyGroup(): void;
    /**
     * Moves the current group to a new position.
     *
     * @param offset The offset to move the current group by.
     */
    moveGroup(offset: number): void;
    /**
     * Gets a list of the property names available for grouping by.
     */
    readonly properties: string[];
    /**
     * Gets a CollectionView with the current group descriptions.
     */
    readonly groupDescriptions: wjcCore.ICollectionView;
}
