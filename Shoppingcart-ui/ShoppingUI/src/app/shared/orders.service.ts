import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'
import { Cart } from './cart.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
baseUrl="http://localhost:3000/api/"
  constructor(private http:HttpClient) { }
  orders;

  myorderUpdatedSub=new Subject<Cart[]>();
  myorder:Cart[]=[];
  getMyOrder(){
    return this.myorder;
  }
  getUpdatedMyOrder(){
    return this.myorderUpdatedSub.asObservable();
  }






  postmyorder(myorder:Cart[]){
   
    this.http.post<{message:string, response:any}>(`${this.baseUrl}myorder`, myorder)
    .subscribe(res=>{
      debugger;
      console.log(res);
      this.myorder=res.response;
      this.myorderUpdatedSub.next([...this.myorder]);
    },err=>{
      console.log(err);
    })
  }
  
  getMyOrders(){
    debugger;
    this.http.get<{message:string, response:any}>(`${this.baseUrl}getmyorder`)
    .pipe(map((postMyOrders)=>{
      return postMyOrders.response.map(order=>{
        
         return{
           id:order._id,
           totalamount:order.totalamount,
           ordertime:order.orderTime,
           address:order.address,
           products:order.products.map(product=>{
            return {
            offerPrice:product.offerPrice,
            actualprice: product.actualprice,
            category: product.category,
            desc: product.desc,
            images: product.images,
            price: product.price,
            quantity: product.quantity,
            title: product.title
          }
          }
          )
         };
        
      })
    }))
    .subscribe(finaldata=>{
      console.log(finaldata);
      this.myorder=finaldata;
      this.myorderUpdatedSub.next([...this.myorder]);
    })
  }

}
