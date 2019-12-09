import { Injectable } from '@angular/core';
import { Product } from '../product.model';
import {map} from 'rxjs/operators'

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Cart } from './cart.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
products:Product[]=[];
productlist;
cartItems:Cart[]=[];
cartItem:Cart;

product:Product;
isCartEmpty=false;
productUpdatedSub=new Subject<Product[]>();
cartUpdatedSub=new Subject<Cart[]>();
// isLoading=true;
isupdatedLoading=new Subject<boolean>()

getUpdatedCart(){
  return this.cartUpdatedSub.asObservable();
}
getUpdatedLoading(){
  return this.isupdatedLoading.asObservable();
}

// getIsLoading(){
//   return this.isLoading;
// }
getUpdatedProduct(){
  return this.productUpdatedSub.asObservable();
}
getCartEmpty(){
  return this.isCartEmpty;
}
baseUrl="http://localhost:3000/api/";
  constructor(private http:HttpClient, private router:Router) { }
productimages=[];
image;
getProducts(){
    this.http.get<{message:string, products:any}>(`${this.baseUrl}getproducts`)
    .pipe(map((productData)=>{
      console.log(productData.products);
     return productData.products.map(prod=>{
      


console.log("this.productimages.length"+this.productimages.length);
  
    const offer=Math.round((prod.price/prod.actualprice)*100)
    const {_id:id, title, desc, category,actualprice, quantity, images, creator, price} = prod;
    
        return this.product={
          id,title,desc,category,actualprice,creator,quantity,price,offerprice:offer,
          images:images, 
        }
      })
      
    }))
    .subscribe(transformedData=>{
      if(transformedData){
        //this.isLoading=false;
        this.isupdatedLoading.next(false)
        this.products=transformedData;
        console.log(transformedData);
        this.productUpdatedSub.next([...this.products])
      }
     // this.isLoading=true;
      this.isupdatedLoading.next(true)
      
    },err=>{
      console.log(err);
    })
  }


//   getProductsByCategory(category:string){
//     this.http.get<{message:string, products:any}>(`${this.baseUrl}getproducts/${category}`)
//     .pipe(map((productData)=>{
//       console.log(productData.products);
//      return productData.products.map(prod=>{
      


// console.log("this.productimages.length"+this.productimages.length);
  
//     const offer=Math.round((prod.price/prod.actualprice)*100)
//     const {_id:id, title, desc, category,actualprice, quantity, images, creator, price} = prod;
    
//         return this.product={
//           id,
//           title,
//           desc,
//           category,
//           actualprice,
//           creator,
//           quantity,
//           price,
//           offerprice:offer,
//           images:images, 
//         }
//       })
      
//     }))
//     .subscribe(transformedData=>{
//       if(transformedData){
//         this.isLoading=false;
//         this.isupdatedLoading.next(false)
//         this.products=transformedData;
//         console.log(transformedData);
//         this.productUpdatedSub.next([...this.products])
//       }
//       this.isLoading=true;
//       this.isupdatedLoading.next(true)
      
//     },err=>{
//       console.log(err);
//     })
//   }

  getProduct(productId){
    return this.http.get<{message:string, response:any}>(`${this.baseUrl}getproduct/${productId}`);
  }
addToCart(cartItem:Cart){
  this.http.post<{message:string, response:any}>(`${this.baseUrl}addcart`, cartItem).subscribe(res=>{
    //this.isLoading=false;
    this.isupdatedLoading.next(false)
    this.cartItem={
      id:res.response._id,
      ...res.response
    };
    this.cartUpdatedSub.next([...this.cartItems]);
    this.isCartEmpty=true;
    this.getCartItems();
  }, err=>{
    console.log(err)
  });
}
deleteCartItem(cartItem:Cart){
  this.http.delete<{message:string, response:any}>(`${this.baseUrl}deletecart/${cartItem.id}`).subscribe(res=>{
    //this.isLoading=false;
    this.isupdatedLoading.next(false)
    this.cartItems=res.response;
    console.log("delete"+res.response);
    this.cartUpdatedSub.next([...this.cartItems]);
  },err=>{
    console.log(err)
  })
}

deleteCartAfterPlaceOrder(){
  return this.http.delete<{message:string, response:any}>(`${this.baseUrl}deleteallcart/`);
}

getCartItems(){
  debugger;
  this.http.get<{message:string, response:any}>(`${this.baseUrl}getcartitems`)
  .pipe(map((cartData)=>{

    return cartData.response.map(cartlist=>{
      const offer=Math.round((cartlist.price/cartlist.actualprice)*100)
      const { title, desc, category, images, actualprice, creator, quantity, price} = cartlist;
      return {
        id:cartlist._id,
        title,
        desc,
        category,
        images, 
        quantity:1, 
        price,
        actualprice,
        creator,
        offerPrice:offer
        
      }
    });
  }))
  .subscribe(finalresponse=>{
    
    //this.isLoading=false;
    this.isupdatedLoading.next(false)
    console.log(finalresponse)
    this.cartItems=finalresponse;
    this.cartUpdatedSub.next([...this.cartItems]);
  },err=>{
    console.log(err)
  })
}




}
