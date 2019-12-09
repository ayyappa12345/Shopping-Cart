import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/users/auth.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit, OnDestroy {
  userdata;
  loggedUserid=localStorage.getItem("user");
  profileSubscription1:Subscription;
  userisAuthenticated;
  imagepath;
  profileSubs:Subscription;
  isProductLoaded=true;
  constructor(private authService:AuthService, private fb:FormBuilder) { }
  profileForm:FormGroup;
  ngOnInit() {
    this.profileForm=this.fb.group({
      "id":[null],
      "fullname":['', [Validators.required]],
      "username":['', [Validators.required]],
      "phone":['', [Validators.required]],
      "email":['', [Validators.required]],
      "gender":['', [Validators.required]],
      "profilePic":[null, [Validators.required]]
    });

    
    this.userdata=this.authService.getProfile(this.loggedUserid);

    this.userisAuthenticated=this.authService.getisAuth();

    this.profileSubscription1=this.authService.getUpdatedUerLoggedSub().subscribe(isAuth=>{
      this.isProductLoaded=false;
      this.userisAuthenticated=isAuth;
      
    });

    this.profileSubs=this.authService.getProfileUpdateSubs().subscribe(res=>{
      this.isProductLoaded=false;
      console.log(res) 
      this.userdata=res;
      this.imagepath=this.userdata.profilePic;

      this.profileForm.setValue({
        "id":this.userdata._id,
        "fullname":this.userdata.fullname,
        "email":this.userdata.email,
        "phone":this.userdata.phone,
        "gender":this.userdata.gender,
        "username":this.userdata.username,
        "profilePic":this.imagepath

      })
       
    },err=>{
      console.log(err)
    })

};
ngOnDestroy(){
  this.profileSubs.unsubscribe();
}

onchangeEvent(event:Event){
  const file=(event.target as HTMLInputElement).files[0];
  const reader=new FileReader();
  reader.onload=()=>{
    this.imagepath=reader.result;
  }
  this.profileForm.patchValue({priofilePic:file})
  this.profileForm.get('profilePic').updateValueAndValidity();
  
  
  console.log(file);
  reader.readAsDataURL(file);
}


onSubmit(form:FormGroup){
  alert(form.get("profilePic").value);
  this.authService.updateProfile(form.value);
}

}
