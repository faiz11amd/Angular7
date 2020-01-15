import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FileUploadModule} from 'ng2-file-upload'
import { VendorRoutingModule } from './vendor-routing.module';
import { VendorComponent } from './vendor.component';
import { HomeComponent } from './home/home.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductsListComponent } from './products-list/products-list.component';
import {SharedModule} from '../shared/modules/shared.module';
import { UpdateProductComponent } from './update-product/update-product.component';

@NgModule({
  declarations: [VendorComponent, HomeComponent, CreateProductComponent, ProductsListComponent, UpdateProductComponent],
  imports: [
    CommonModule,
    VendorRoutingModule,
    SharedModule,
    FileUploadModule
  ]
})
export class VendorModule { }
