import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './shared/components/login/login.component'
import {RegisterComponent} from './shared/components/register/register.component'
const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'admin',loadChildren:'./admin/admin.module#AdminModule'},
  {path:'customer',loadChildren:'./customer/customer.module#CustomerModule'},
  {path:'vendor',loadChildren:'./vendor/vendor.module#VendorModule'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
