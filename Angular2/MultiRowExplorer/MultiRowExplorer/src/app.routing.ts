




import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Application Routes. "data.caption" defines captions for navigation links in markup.
export const routes: Routes = [
    { path: '', redirectTo: 'transferSlip', pathMatch: 'full' },
    { path: 'transferSlip', loadChildren: 'src/components/TransferSlipCmp#TransferSlipModule' },
    { path: 'ordersSlip', loadChildren: 'src/components/OrdersSlipCmp#OrdersSlipModule' },
    { path: 'orderDetail', loadChildren: 'src/components/OrderDetailCmp#OrderDetailModule' },
    { path: 'purchaseSlip', loadChildren: 'src/components/PurchaseSlipCmp#PurchaseSlipModule' },
    { path: 'orderManagement', loadChildren: 'src/components/OrderManagementCmp#OrderManagementModule' },
    { path: 'salesSlip', loadChildren: 'src/components/SalesSlipCmp#SalesSlipModule' }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });

