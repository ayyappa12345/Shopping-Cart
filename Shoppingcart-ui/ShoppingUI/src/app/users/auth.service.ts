import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from './user.model';
import { MyProfile } from './profile.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseURL="http://localhost:3000/api/";
isAuthenticated=true;
token:string;
Timer:any;
userLoggedSub=new Subject<boolean>();
user:User;
loggedUser;;
profile:MyProfile;
profileUpdatedSub=new Subject()



getProfileUpdateSubs(){
  return this.profileUpdatedSub.asObservable();
}
registerUser(user:User){
  debugger;
  this.http.post<{message:string, response:any}>(`${this.baseURL}register`, user)
  .subscribe(res=>{
    console.log(res);
    if(res){
      this.loginUser(user.email, user.password)
    }
  })
}

getUpdatedUerLoggedSub(){
  return this.userLoggedSub.asObservable();
}
 constructor(private http:HttpClient, private router:Router) { }
  getisAuth(){
    return this.isAuthenticated;
  }

  getToken(){
    return this.token;
  }
  setLocalStorage(token:string, expires:Date, user:string){
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);
    localStorage.setItem("expires", expires.toISOString());
  }
  getLocalStorage(){
    const token=localStorage.getItem("token");
    const expires=localStorage.getItem("expires");
    const user=localStorage.getItem("user");

    return {
      token:token,
      user:user,
      expires:new Date(expires)
    }
  }
  removeLocalStorage(){
    localStorage.removeItem("token");
    localStorage.removeItem("expires");
    localStorage.removeItem("user");
  }
logoutUser(){
  this.token=null;
  this.removeLocalStorage();
  this.isAuthenticated=false;
  this.loggedUser=null;
 this.userLoggedSub.next(false);
 this.router.navigate(['/login']);
  this.clearTime();

}

getProfile(userid:string){
 this.http.get<{message:string, response:any}>(`${this.baseURL}profile/${userid}`).subscribe(res=>{
   console.log(res.response);
   this.profileUpdatedSub.next(res.response);
   return this.profile={
     id:res.response._id,
     ...res.response
    };
 })
}

updateProfile(profile:MyProfile){
 debugger;
const form=new FormData();
form.append("fullname",profile.fullname);
form.append("email",profile.email);
form.append("username",profile.username);
form.append("phone",profile.phone);
form.append("gender",profile.gender);
form.append("profilePic",profile.profilePic);

  this.http.put<{message:string, response:any}>(`${this.baseURL}/updateprofile/${profile.id}`, form).subscribe(res=>{
    console.log(res.response);
  },err=>{
    console.log(err)
  })
}

setAutoAuth(){
  const authUser=this.getLocalStorage();
  const now= new Date();
  const expires=authUser.expires.getTime()-now.getTime();
  console.log(expires);
  if(expires > 0){
    this.setTime(expires);
    this.token=authUser.token;
    this.isAuthenticated=true;
    this.loggedUser=authUser.user;
 
    this.getProfile(authUser.user);
   this.userLoggedSub.next(true);
  }
  else{
    this.logoutUser();

  }
}
setTime(duration){
  this.Timer=setTimeout(()=>{this.logoutUser()},duration);
}
clearTime(){
  clearTimeout(this.Timer);
}
  loginUser(email:string, password:string){
    debugger;
    const user={email:email, password:password};
    this.http.post<{message:string, token:string, creator:string, expires:number}>(`${this.baseURL}login`, user).subscribe(res=>{
      if(res){
       const token=res.token;
       this.token=token;
       
       console.log(token);
       const expires=res.expires * 1000;
       console.log(expires);
        const now=new Date();
       if(token){
         this.isAuthenticated=true;
         this.setTime(expires);
         const expiration=new Date(now.getTime()+expires);
         const user=res.creator;
         this.loggedUser=user;
         this.setLocalStorage(token, expiration, user);
         this.userLoggedSub.next(true);
         this.getProfile(user);
         this.router.navigate(['/products']);
       }

        
      }
    }, err=>{
      console.log(err);
      
    })
  }

}
