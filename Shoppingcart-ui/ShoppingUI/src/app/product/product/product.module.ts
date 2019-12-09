import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartViewComponent } from '../cart-view/cart-view.component';
import { ProductsComponent } from '../products/products.component';
import { ProductviewComponent } from '../productview/productview.component';
import { ProductComponent } from '../product.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [
    CartViewComponent,
    ProductsComponent,
    ProductviewComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class ProductModule { }
