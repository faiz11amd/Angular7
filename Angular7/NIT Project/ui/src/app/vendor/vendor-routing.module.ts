import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VendorComponent} from './vendor.component'
import {CreateProductComponent} from './create-product/create-product.component'
import {ProductsListComponent} from './products-list/products-list.component'
import { HomeComponent } from './home/home.component';
import {ChangePwdComponent} from '../shared/components/change-pwd/change-pwd.component';
import {UpdateProductComponent} from './update-product/update-product.component';

const routes: Routes = [{
  path:'',
  component:VendorComponent,
  children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'create-product',component:CreateProductComponent},
    {path:'products-list',component:ProductsListComponent},
    {path:'cpwd',component:ChangePwdComponent},
    {path:'update-product/:pid',component:UpdateProductComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
