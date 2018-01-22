'use strict';

import { Injectable } from '@angular/core';
import { GroupManager } from '../groupManager';
import { SortManager } from '../sortManager';
// Common data service
@Injectable()
export class ManagerSvc {
    sortManager: SortManager;
    groupManager: GroupManager;
}