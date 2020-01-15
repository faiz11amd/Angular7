import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router'
import {ServercallService} from '../../shared/services/servercall.service'
import {SharedService} from '../../shared/services/shared.service';
import {SubSink} from '../../../../node_modules/subsink';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products:any=[];
  totalProducts:any=[];
  timeStamp=new Date().getTime();
  isShowLoader=false;
  imageBaseUrl = '';
  subs = new SubSink();
  constructor(private router:Router,private shared:SharedService,private serverCall:ServercallService) {
    this.imageBaseUrl = this.serverCall.imageBaseUrl;
    this.subs.add(this.shared.fnSearchObservable().subscribe((text:any)=>{
          this.products=this.totalProducts.filter((obj)=>{
                   return obj.name.toLowerCase().includes(text.toLowerCase())
          })
    }))
  }

  ngOnInit() {
    this.fnGetProducts();
  }
  fnProductClick(id){
    this.router.navigateByUrl(`customer/product-view/${id}`)
  }
  fnGetProducts(){
    debugger;
    this.isShowLoader=true;
      this.subs.add(this.serverCall.fnSendGetReq('products/all-products')
      .subscribe((res)=>{
            this.isShowLoader=false;
            this.shared.products=res;
            this.products=res;
            this.totalProducts=res;
      },
      ()=>{
        this.isShowLoader=false;
        this.shared.fnSetToasterMsg('Something went wrong..try again','red');
      }))
  }

  ngOnDestroy() {
    debugger;
    this.subs.unsubscribe();
  }

}
