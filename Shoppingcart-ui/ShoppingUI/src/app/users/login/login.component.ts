import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private fb:FormBuilder, private authservice:AuthService) { }

  ngOnInit() {
    this.loginForm=this.fb.group({
      "email":['', Validators.required],
      "password":['', Validators.required]
    })
  }
  onSubmit(form:FormGroup){
    debugger;
    this.authservice.loginUser(form.value.email, form.value.password);
  }

}
