import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms'
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { ProductRoutingModule } from './product/product/product-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { AuthInterceptor } from './users/auth-interceptor';
import { AuthGuard } from './user/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { MyprofileComponent } from './profile/myprofile/myprofile.component';
import { AddressComponent } from './profile/address/address.component';
import { MyordersComponent } from './profile/myorders/myorders.component';
import { MyorderComponent } from './profile/myorder/myorder.component';
import { ProductModule } from './product/product/product.module';
import { ProfileModule } from './profile/profile.module';
import { ProfileRoutingModule } from './profile/profile-routing.module';
import { Profile } from 'selenium-webdriver/firefox';
import { SampleComponent } from './sample/sample.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
 
    UsersComponent,
    LoginComponent,
    RegisterComponent,
    SampleComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
