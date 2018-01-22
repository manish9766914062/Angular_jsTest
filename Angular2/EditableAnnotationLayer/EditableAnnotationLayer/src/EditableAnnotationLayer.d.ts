import * as wjcCore from 'wijmo/wijmo';
import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcChartAnnotation from 'wijmo/wijmo.chart.annotation';
/**
 * Represents a Button of EditableAnnotationLayer.
 */
export declare class Button {
    private _iconFunc;
    private _drawFunc;
    private _resizeFunc;
    constructor(iconFunc: any, drawFunc: any, resizeFunc: any);
    /**
     * Gets the function of drawing button icon.
     */
    readonly iconFunc: Function;
    /**
     * Gets the function of drawing annotation.
     */
    readonly drawFunc: Function;
    /**
     * Gets the function of resizing annotation.
     */
    readonly resizeFunc: Function;
}
/**
 * Class that represents a point with data (with x and y coordinates and dx, dy).
 */
export declare class DataPoint extends wjcCore.Point {
    /**
     * Gets or sets the data coordinate x of this @see:DataPoint.
     */
    dx: any;
    /**
     * Gets or sets the data coordinate y of this @see:DataPoint.
     */
    dy: any;
    /**
     * Initializes a new instance of a @see:DataPoint object.
     *
     * @param x X coordinate of the new DataPoint.
     * @param y Y coordinate of the new DataPoint.
     */
    constructor(x?: number, y?: number);
}
/**
 * Represents an extension of the editable annotation layer for the wjcChart.FlexChart.
 *
 * The EditableAnnotationLayer contains a collection of annotation elements: texts, lines, images, rectangle etc.
 */
export declare class EditableAnnotationLayer extends wjcChartAnnotation.AnnotationLayer {
    private _isEditable;
    private _editableUI;
    private _hostMouseDown;
    private _hostMouseMove;
    private _hostMouseUp;
    private _hostMouseLeave;
    private _hostClick;
    private _hostDBLClick;
    private _isDragging;
    private _draggingAnno;
    private _textEditorAnno;
    private _originPoint;
    private _chartMarginPlot;
    private _topMarginAdded;
    private _isDeleting;
    private _isAdding;
    private _selectedBtnIdx;
    private _buttons;
    private _timer;
    private _textEditor;
    private _isDataCoordinate;
    /**
     * Initializes a new instance of a @see:EditableAnnotationLayer object.
     *
     * @param chart The chart on which the EditableAnnotationLayer attached to.
     * @param options A JavaScript object containing initialization data for EditableAnnotationLayer.
     */
    constructor(chart: wjcChart.FlexChart, options?: any);
    _init(chart: wjcChart.FlexChart): void;
    /**
     * Gets the collection of annotation elements in wjcChartInteraction.AnnotationLayer.
     */
    readonly buttons: wjcCore.ObservableArray;
    _renderGroup(): void;
    private _createEditableUI();
    private _drawRCContainer(engine, x?);
    private _drawIcons(engine);
    _showTooltip(): boolean;
    private _toggleUIVisible(value);
    _convertMargin(): string;
    private _bindEditableEvent();
    private toggleDragEventBinding(bind?);
    private _getIconElement(ele, pNode);
    private _onHostDBLClick(e);
    private _textEditorClick(e);
    private _dlbClick(e, anno);
    private _onHostClick(e);
    private _onHostMouseDown(e);
    private _convertPtToData(point);
    _convertLenToData(total: number, axis: wjcChart.Axis, val: any, converted?: boolean): any;
    private _clearTimer();
    private _onHostMouseMove(e);
    private _onHostMouseUp(e);
    private _onHostMouseLeave(e);
    private _convertTransform();
    private _toggleIsDragging(value, anno?);
    private _toggleIsAdding(value);
    /**
     * Gets or sets the visibility of the Annotation.
     */
    isEditable: boolean;
}
