import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../../shared/product.service';
import { Product } from '../../product.model';
import { Cart } from '../../shared/cart.model';
import { AuthService } from '../../users/auth.service';

@Component({
  selector: 'app-productview',
  templateUrl: './productview.component.html',
  styleUrls: ['./productview.component.css']
})
export class ProductviewComponent implements OnInit {
product:Product;
id:string;
userisAuthenticated;
productIsLoaded=true;
  constructor(private route:ActivatedRoute, private router:Router, private authService:AuthService, private productService:ProductService) { }

  ngOnInit() {
    this.userisAuthenticated=this.authService.getisAuth();
    this.route.paramMap.subscribe((params)=>{
      const id=params.get("id");
      this.id=id;
    
     
      this.productService.getProduct(id).subscribe(res=>{
        this.productIsLoaded=false;
  const offer=Math.round((res.response.price/res.response.actualprice)*100)
        this.product={
          id:res.response._id,
          offerprice:offer,
          ...res.response,
        }
        
      })
      
    })
  }
addcart(product:Product){
if(this.userisAuthenticated){
  const cartItem:Cart=product
  this.productService.addToCart(cartItem);
}


else{
  this.router.navigate(['/login']);
}
}

buynow(product:Product){
  if(this.userisAuthenticated){
    const cartItem:Cart=product
    this.productService.addToCart(cartItem);
    this.router.navigate(['/cart']);
  }
  
  
  else{
    this.router.navigate(['/login']);
  }
}

}
