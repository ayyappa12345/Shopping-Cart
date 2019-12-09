import { Injectable } from '@angular/core';
import { Address } from './address.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import{map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  addresses:Address[]=[];
  address:Address;
  addressSubject=new Subject<Address[]>();
  isAddress;
  getUpdatedaddress(){
    return this.addressSubject.asObservable();
  }
  constructor(private http:HttpClient) { }
  getIsAddress(){
    return this.addAddress;
  }
   baseURL="http://localhost:3000/api/";
  addAddress(addr:Address){
    
    this.http.post<{message:string, resposnse:any}>(`${this.baseURL}addadress`, addr)
    .subscribe((res)=>{
      this.address={
        id:res.resposnse._id,
        ...res.resposnse
      }
      console.log(res.resposnse);
      this.addresses=res.resposnse;
      console.log(this.addresses);
      this.addressSubject.next([...this.addresses]);
    })
  }
  
  getAddresses(){
    this.http.get<{message:string,response:any}>(`${this.baseURL}getaddress`)
    .pipe(map((addData)=>{
      return addData.response.map(data=>{
        const { name, phone, addtype, pincode, location, address, city, state} = data;
        return this.address= {
            id:data._id,
            name,
            phone,
            pincode,
            addtype,
            location, 
            address,
            city,
            state
          }
      })
    })).subscribe(finaladdress=>{
   
      this.addresses=finaladdress;
      this.addressSubject.next([...this.addresses]);
    })
  }


  deleteAddress(addrId:string){
    this.http.delete<{message:string, response:any}>(`${this.baseURL}deleteaddress/${addrId}`)
    .subscribe(res=>{
      this.addressSubject.next([...this.addresses]);
    })
  }


}
