




import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Application Routes. "data.caption" defines captions for navigation links in markup.
export const routes: Routes = [
    { path: '', redirectTo: 'store', pathMatch: 'full' },
    { path: 'store', loadChildren: 'src/components/StoreCmp#StoreModule' },
    { path: 'product', loadChildren: 'src/components/ProductCmp#ProductModule' },
    { path: 'cart', loadChildren: 'src/components/ShoppingCartCmp#ShoppingCartModule' }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });

