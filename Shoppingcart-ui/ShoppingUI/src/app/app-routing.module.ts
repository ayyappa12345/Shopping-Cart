import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './user/auth.guard';


const routes: Routes = [
  {path:"", loadChildren:"../app/product/product/product.module#ProductModule"},
  {path:"", loadChildren:"../app/profile/profile.module#ProfileModule"},
  {path:'home', component:HomeComponent},
  {path:"", component:UsersComponent, children:[
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
  ]},
  {path:'', redirectTo:'home', pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy:NoPreloading})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
