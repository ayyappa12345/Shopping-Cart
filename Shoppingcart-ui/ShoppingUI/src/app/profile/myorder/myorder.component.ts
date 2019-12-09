import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from '../../shared/cart.model';
import { OrdersService } from 'src/app/shared/orders.service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit, OnDestroy {
myorders;
myorderSubs:Subscription;

  constructor(private orderService:OrdersService) { }
  ngOnInit() {
    debugger;
    this.orderService.getMyOrders();
    this.myorders=this.orderService.getMyOrder();
    this.myorderSubs=this.orderService.getUpdatedMyOrder().subscribe(order=>{
      this.myorders=order;
    })
    
  }
  ngOnDestroy(){
    this.myorderSubs.unsubscribe();
  }

}
