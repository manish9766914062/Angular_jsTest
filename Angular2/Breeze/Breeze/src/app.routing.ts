
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Application Routes. "data.caption" defines captions for navigation links in markup.
export const routes: Routes = [
    { path: '', data: { caption: 'Home' }, loadChildren: 'src/components/HomeCmp#HomeModule' },
    { path: 'customers', data: { caption: 'Customers' }, loadChildren: 'src/components/CustomersCmp#CustomersModule' },
    { path: 'orders', data: { caption: 'Orders' }, loadChildren: 'src/components/OrdersCmp#OrdersModule' },

];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });