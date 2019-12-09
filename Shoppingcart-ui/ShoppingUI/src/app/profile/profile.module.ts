import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { AddressComponent } from './address/address.component';
import { MyorderComponent } from './myorder/myorder.component';
import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProfileComponent,
    MyprofileComponent,
    AddressComponent,
    MyorderComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
  ]
})
export class ProfileModule { }
