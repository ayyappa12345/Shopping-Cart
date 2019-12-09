import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './shared/product.service';
import { AuthService } from './users/auth.service';
import { Subscription } from 'rxjs';
import { Address } from './shared/address.model';
import { AddressService } from './shared/address.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  iscartEmpty=false;
  addresses:Address[]=[];
  userisAuthenticated;
  updatedAddSubs:Subscription;
  userdata;
  isAddress;
  loggedUserid=localStorage.getItem("user");
  constructor(private productservice:ProductService, private addrService:AddressService, private authService:AuthService){};
  ngOnInit(){
    
    this.userisAuthenticated=this.authService.getisAuth();
    this.authService.setAutoAuth();
    this.authService.getUpdatedUerLoggedSub().subscribe(isAuth=>{
    this.userisAuthenticated=isAuth;

      if(isAuth){
        this.addrService.getAddresses();
        this.isAddress=this.addrService.getIsAddress();
        this.iscartEmpty=this.productservice.getCartEmpty();
        this.updatedAddSubs=this.addrService.getUpdatedaddress()
       .subscribe(res=>{
      console.log(res); 
      this.addrService.getIsAddress()
      this.addresses=res;
     
    },err=>{
      console.log(err)
    })
        
      }
      
     

    },err=>{
      console.log(err)
    });

    this.userdata=this.authService.getProfile(this.loggedUserid);
    console.log(this.userdata)
    debugger;
    this.authService.getProfileUpdateSubs().subscribe(res=>{
      this.userdata=res;
      console.log(res);
    },err=>{
      console.log(err)
    })

  }

  ngOnDestroy(){
    this.updatedAddSubs.unsubscribe();
  }

}
