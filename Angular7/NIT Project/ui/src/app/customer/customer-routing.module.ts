import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerComponent} from './customer.component'
import {ProfileComponent} from './profile/profile.component'
import {OrdersComponent} from './orders/orders.component'
import {CartComponent} from './cart/cart.component'
import { HomeComponent } from './home/home.component';
import {ProductViewComponent} from './product-view/product-view.component'
import {OrderSuccessComponent} from './order-success/order-success.component'
import {ChangePwdComponent} from '../shared/components/change-pwd/change-pwd.component'
const routes: Routes = [{
  path:'',
  component:CustomerComponent,
  children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'cart',component:CartComponent}  ,
    {path:'profile',component:ProfileComponent},
    {path:'orders',component:OrdersComponent},
    {path:'order-success',component:OrderSuccessComponent},
    {path:'cpwd',component:ChangePwdComponent},
    {path:'product-view/:id',component:ProductViewComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
