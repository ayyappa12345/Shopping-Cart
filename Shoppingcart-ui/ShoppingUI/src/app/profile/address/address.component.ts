import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddressService } from '../../shared/address.service';
import { Address } from '../../shared/address.model';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit, OnDestroy {
addresses:Address[]
updatedAddSubs:Subscription;
userid:string;
isAddress;
addressform:FormGroup
addnew=false;
userId;

  constructor(private addrService:AddressService, private fb:FormBuilder) { }










  

  ngOnInit() {
    this.userId=localStorage.getItem("user");

    this.addressform=this.fb.group({
      "name":['', Validators.required],
      "phone":['', Validators.required],
      "address":['', Validators.required],
      "location":['', Validators.required],
      "city":['', Validators.required],
      "state":['', Validators.required],
      "pincode":['', Validators.required],
      "addtype":['', Validators.required],
    })
    

    this.isAddress=this.addrService.getIsAddress();
    console.log(this.isAddress);
    this.userid=localStorage.getItem("user");
    this.addrService.getAddresses();
    this.updatedAddSubs=this.addrService.getUpdatedaddress().subscribe(res=>{
      this.addresses=res;
  
    })
  }

  onSubmitAddress(form:FormGroup){

    this.addrService.addAddress(form.value);
    this.updatedAddSubs=this.addrService.getUpdatedaddress().subscribe(res=>{
      this.addrService.getIsAddress()
      this.addresses=res;
  
    })
    this.addrService.getIsAddress();
    form.reset();
    this.addnew=false;
  }
  ngOnDestroy(){
    this.updatedAddSubs.unsubscribe();
  }

}
