'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var wjcCore = require("wijmo/wijmo");
// Common data service
var FreezeBarSvc = /** @class */ (function () {
    function FreezeBarSvc() {
        this.dragging = false;
        this.freeze = -1;
    }
    // add a freezing handle to a FlexGrid
    FreezeBarSvc.prototype.addFreezeBar = function (flex) {
        var _this = this;
        // create freeze handle
        var freezeBar = document.createElement('div'), host = flex.hostElement;
        this.dragging = false;
        this.flex = flex;
        this.host = host;
        this.freezeBar = freezeBar;
        wjcCore.addClass(freezeBar, 'freeze-bar');
        // add handle to flex
        var root = host.querySelector('[wj-part="root"]');
        root.parentElement.appendChild(freezeBar);
        this._positionfreezeBar(flex, freezeBar, flex.frozenColumns);
        // attach event handlers
        flex.columns.collectionChanged.addHandler(function () {
            _this._positionfreezeBar(flex, freezeBar, flex.frozenColumns);
        });
        host.addEventListener('mousedown', this._gridMouseDown.bind(this), true);
        host.addEventListener('mousemove', this._gridMouseMove.bind(this), true);
        // stop dragging when the user releases the mouse button
        host.addEventListener('mouseup', function (e) {
            _this._stopDragging(e);
        }, true);
        // stop dragging when the mouse leaves the control
        host.addEventListener('mouseleave', function (e) {
            if (e.target == host) {
                _this._stopDragging(e);
            }
        }, true);
    };
    FreezeBarSvc.prototype._gridMouseDown = function (e) {
        var el = document.elementFromPoint(e.clientX, e.clientY);
        if (el == this.freezeBar && this.flex.rows.length > 0 && this.flex.columns.length > 0) {
            // prepare to freeze
            this.flex.frozenColumns = 0;
            this.flex.scrollPosition = new wjcCore.Point(0, this.flex.scrollPosition.y);
            this.dragging = true;
            this.freeze = -1;
            this.host.style.cursor = 'col-resize';
            // done with this event
            e.preventDefault();
            e.stopPropagation();
        }
    };
    FreezeBarSvc.prototype._gridMouseMove = function (e) {
        if (this.dragging) {
            // find closest edge
            var minDist = null;
            for (var i = 0; i <= this.flex.viewRange.col2; i++) {
                var rc = this.flex.getCellBoundingRect(0, i), dist = Math.abs(rc.left - e.clientX);
                if (minDist == null || dist < minDist) {
                    minDist = dist;
                    this.freeze = i;
                }
            }
            // move element to edge
            this._positionfreezeBar(this.flex, this.freezeBar, this.freeze);
            // done with this event
            e.preventDefault();
            e.stopPropagation();
        }
    };
    // stop dragging when the button is released or when the mouse leaves the control
    FreezeBarSvc.prototype._stopDragging = function (e) {
        if (this.dragging) {
            this.dragging = false;
            if (this.freeze > -1) {
                this.flex.frozenColumns = this.freeze;
            }
            this.host.style.cursor = '';
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            this._positionfreezeBar(this.flex, this.freezeBar, this.flex.frozenColumns);
        }
    };
    // position the freeze bar on the right of the last frozen column
    FreezeBarSvc.prototype._positionfreezeBar = function (flex, div, frozen) {
        var left = -10;
        if (flex.columns.length > 0 && flex.rows.length > 0) {
            left = frozen > 0
                ? flex.getCellBoundingRect(0, Math.min(frozen, flex.columns.length) - 1).right
                : flex.getCellBoundingRect(0, 0).left;
        }
        left -= div.parentElement.getBoundingClientRect().left;
        div.style.left = left + 'px';
    };
    FreezeBarSvc = __decorate([
        core_1.Injectable()
    ], FreezeBarSvc);
    return FreezeBarSvc;
}());
exports.FreezeBarSvc = FreezeBarSvc;
//# sourceMappingURL=FreezeBarSvc.js.map