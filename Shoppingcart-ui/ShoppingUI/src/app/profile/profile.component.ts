import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../users/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userdata;
  loggedUserid=localStorage.getItem("user");
  profileSubscription1:Subscription;
  profileSubscription:Subscription;
  isProductLoaded=true;
  userisAuthenticated;
  constructor(private authService:AuthService) { }

  ngOnInit() {



    this.userdata=this.authService.getProfile(this.loggedUserid);
    this.profileSubscription1=this.authService.getProfileUpdateSubs().subscribe(res=>{
      console.log(res) 
      this.isProductLoaded=false;
      this.userdata=res;
       
    })
  }
  
ngOnDestroy(){
  this.profileSubscription1.unsubscribe();
}
}
