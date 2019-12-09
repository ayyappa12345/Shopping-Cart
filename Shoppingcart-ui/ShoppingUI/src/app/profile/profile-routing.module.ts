import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/user/auth.guard';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { AddressComponent } from './address/address.component';
import { MyorderComponent } from './myorder/myorder.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {path:'', component:ProfileComponent, children:[
    {path:'myprofile', component:MyprofileComponent, canActivate:[AuthGuard]},
    {path:'manageaddress', component:AddressComponent, canActivate:[AuthGuard]},
    {path:'myorders', component:MyorderComponent, canActivate:[AuthGuard]},
  ]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
