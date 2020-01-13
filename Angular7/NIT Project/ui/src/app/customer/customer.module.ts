import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductViewComponent } from './product-view/product-view.component';
import {SharedModule} from '../shared/modules/shared.module';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { TileComponent } from './tile/tile.component'

@NgModule({
  declarations: [CustomerComponent, HomeComponent, OrdersComponent, CartComponent, ProfileComponent, SearchComponent, ProductsListComponent, ProductViewComponent, OrderSuccessComponent, TileComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule
  ]
})
export class CustomerModule { }
