import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin.component'
import {HomeComponent} from './home/home.component'
import {CreateVendorComponent} from './create-vendor/create-vendor.component'
import {VendorsListComponent} from './vendors-list/vendors-list.component';
import {UpdateVendorComponent} from './update-vendor/update-vendor.component';
import {ChangePwdComponent} from '../shared/components/change-pwd/change-pwd.component';
const routes: Routes = [{
  path:'',
  component:AdminComponent,
  children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'vendor-list',component:VendorsListComponent},
    {path:'create-vendor',component:CreateVendorComponent},
    {path:'update-vendor/:id',component:UpdateVendorComponent},
    {path:'cpwd',component:ChangePwdComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
