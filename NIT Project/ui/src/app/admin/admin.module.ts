import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { CreateVendorComponent } from './create-vendor/create-vendor.component';
import { VendorsListComponent } from './vendors-list/vendors-list.component';
import {SharedModule} from '../shared/modules/shared.module';
import { UpdateVendorComponent } from './update-vendor/update-vendor.component'

@NgModule({
  declarations: [AdminComponent, HomeComponent, CreateVendorComponent, VendorsListComponent, UpdateVendorComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
