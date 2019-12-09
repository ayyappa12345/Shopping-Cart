import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  defaultprofile="../../assets/images/default.png";
  registerForm:FormGroup;
  constructor(private fb:FormBuilder, private authservice:AuthService) { }

  ngOnInit() {
    this.registerForm=this.fb.group({
      "email":['', Validators.required],
      "password":['', Validators.required],
      "fullname":['', Validators.required],
      "username":['', Validators.required],
      "phone":['', Validators.required],
      "gender":['male', Validators.required],
      "profilePic":[this.defaultprofile, Validators.required],
    })
  }
  onSubmit(form:FormGroup){
    debugger;
    this.authservice.registerUser(form.value);
  }
}
