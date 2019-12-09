import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../shared/product.service';
import { Product } from '../../product.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Cart } from '../../shared/cart.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products:Product[]=[];
  productslistSubs:Subscription;
  productloadSubs:Subscription;
  productIsLoaded=true;
  prodCategory;
  constructor(private productService:ProductService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {

this.route.paramMap.subscribe((params)=>{
  console.log("catogy"+ params.get("category"))
  const prodCategory=params.get("category");
  this.prodCategory=prodCategory;
  this.productslistSubs=this.productService.getUpdatedProduct().subscribe(res=>{
    this.products=res;
    this.productIsLoaded=false;
  }, err=>{
    console.log(err)
  })
  if(!prodCategory){
  
    this.productService.getProducts();  

  }
}, err=>{
  console.log(err)
})  
    
  };
  view(product:Product){
    this.router.navigate(['/viewproduct', product.id]);
  }
  addcart(product:Product){
    const cartItem:Cart=product
    this.productService.addToCart(cartItem);
  }

  ngOnDestroy(){
    this.productslistSubs.unsubscribe();
  }

}
