import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/user/auth.guard';
import { ProductsComponent } from '../products/products.component';
import { ProductviewComponent } from '../productview/productview.component';
import { CartViewComponent } from '../cart-view/cart-view.component';

const routes: Routes = [
    {path:'products', component:ProductsComponent},
    {path:'viewproduct/:id', component:ProductviewComponent},
    {path:'cart', component:CartViewComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
