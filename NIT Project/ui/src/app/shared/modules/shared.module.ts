import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoaderComponent} from '../components/loader/loader.component'
import {ToasterComponent} from '../components/toaster/toaster.component'
import {RegisterComponent} from '../components/register/register.component'
import {FormsModule} from '@angular/forms';
import {ChangePwdComponent} from '../components/change-pwd/change-pwd.component'
import {TableComponent} from '../components/table/table.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {PaginationComponent} from '../components/pagination/pagination.component'
@NgModule({
  declarations: [ChangePwdComponent,LoaderComponent,ToasterComponent,RegisterComponent,PaginationComponent,TableComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatInputModule
  ],
  exports:[
    LoaderComponent,
    ToasterComponent,
    RegisterComponent,
    FormsModule,
    PaginationComponent,
    TableComponent,
    ChangePwdComponent,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatInputModule
  ]
})
export class SharedModule { }
