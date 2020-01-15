import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {IntercepterService} from './shared/services/intercepter.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MenuClickDirective } from './shared/directives/menu-click.directive';
import { ReversePipe } from './shared/pipes/reverse.pipe';
import { FilterPipe } from './shared/pipes/filter.pipe';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './shared/components/login/login.component'
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import {SharedModule} from './shared/modules/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuClickDirective,
    ReversePipe,
    FilterPipe,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IntercepterService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
