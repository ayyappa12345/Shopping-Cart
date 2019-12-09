import { Component, OnInit, OnDestroy } from '@angular/core';


import { Subscription } from 'rxjs';

import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { Cart } from 'src/app/shared/cart.model';
import { Address } from 'src/app/shared/address.model';
import { ProductService } from 'src/app/shared/product.service';
import { OrdersService } from 'src/app/shared/orders.service';
import { AddressService } from 'src/app/shared/address.service';
import { AuthService } from 'src/app/users/auth.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit, OnDestroy {
cartItems:Cart[]=[];
isPlaceOrder=false;
TotalPrice;
DelivaryCharge;
userId:string;
totalSave;
productIsLoaded=true;
productloadSubs:Subscription;
addList:Address[]=[];
deliverhere=false;
cartForm:FormGroup;
thankyoupage=false;
  constructor(private productService:ProductService, private fb:FormBuilder, private orderService:OrdersService, private addressService:AddressService, private authService:AuthService) { }

  ngOnInit() {
    // this.productIsLoaded=this.productService.getIsLoading();
    // this.productloadSubs=this.productService.getUpdatedLoading().subscribe(loaded=>{
    //   debugger;
    //  this.productIsLoaded=loaded;
    // });    

this.addressService.getAddresses();
this.addressService.getUpdatedaddress().subscribe(data=>{
  this.addList=data;
})
    

    this.userId=localStorage.getItem("user");
    this.productService.getCartItems();
    this.productService.getUpdatedCart().subscribe(cartdata=>{
    this.cartItems=cartdata;
    console.log(cartdata);
    this.getTotalPrice();
    this.getTotalSave();
    this.productIsLoaded=false;
    });
  }
getTotalPrice(){
  this.TotalPrice=this.cartItems.reduce((prev, cur) => prev + (cur.price*cur.quantity), 0);
    this.DelivaryCharge=this.TotalPrice > 100? 0 : 10;
};
getTotalSave(){
  this.totalSave=this.cartItems.reduce((prev, cur) =>prev + ((cur.actualprice-cur.price)*cur.quantity),0)
}

  removeItem(cartItem:Cart){
    this.productService.deleteCartItem(cartItem);
    this.productIsLoaded=true;
    this.productService.getCartItems();
  }
  decrese(cartItem:Cart){
    console.log(cartItem);
    if(cartItem.quantity >1){
    cartItem.quantity=cartItem.quantity-1;
    this.getTotalPrice();
    this.getTotalSave()
    }
   
  }
  increse(cartItem:Cart){
    console.log(cartItem);
    if(cartItem.quantity < 2){
      cartItem.quantity=cartItem.quantity+1;
      this.getTotalPrice();
      this.getTotalSave()
    }
    else{
      alert("You have maximum of 2 items")
    }
    
  }

  onSubmit(cartItems){
    this.orderService.postmyorder(cartItems);
    debugger;
    this.productService.deleteCartAfterPlaceOrder().subscribe(
      res=>{
       
        this.thankyoupage=true;
      }
    )
  }
  here(addid){
    this.deliverhere=true;
    
  }
  

ngOnDestroy(){
  //this.productloadSubs.unsubscribe();
}
}
