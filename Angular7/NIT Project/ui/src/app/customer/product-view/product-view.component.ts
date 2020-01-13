import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../shared/services/shared.service'
import { ServercallService } from '../../shared/services/servercall.service'
import { SubSink } from 'subsink';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit, OnDestroy {
  dataObj:any = {};

  timeStamp=new Date().getTime();
  isShowLoader = false;
  imageBaseUrl = '';
  subs = new SubSink();

  constructor(private router: Router, private shared: SharedService, private activatedRouter: ActivatedRoute, private serverCall: ServercallService) {
    this.imageBaseUrl = this.serverCall.imageBaseUrl;
    this.activatedRouter.params.subscribe((data) => {
        this.isShowLoader = true;
        this.subs.add(this.serverCall.fnSendGetReq('products/product-info?id=' + data.id)
          .subscribe((res: any) => {
            this.isShowLoader = false;
            if (res.length) {
              this.dataObj = res[0];
            } else {
              this.shared.fnSetToasterMsg('No Product found with this id', 'red');
            }
          }, (data) => {
            this.shared.fnSetToasterMsg('something went wrong', 'red');
            this.isShowLoader = false;
          }))
    })
  }

  ngOnInit() {
  }

  fnAddToCustomer(opt){
    debugger;
    let data={
      id:sessionStorage.id,
      product:this.dataObj
    }
    if(opt == 'add-to-cart'){
      let isExist=this.shared.fnCheckInCart(this.dataObj['_id']);
      if(isExist){
        this.shared.fnSetToasterMsg('Product already added to cart','red');
        return;
      }
    }
    this.subs.add(this.serverCall.fnSendPostReq('users/'+opt,data)
    .subscribe((res:any)=>{
      if(res.modifiedCount > 0){
          if(opt == 'buy-now'){
               this.shared.fnUpdateOrder(this.dataObj);
               this.router.navigateByUrl('customer/order-success');
          }else{
            this.shared.fnSetToasterMsg('Your product added to cart','green');
            this.shared.fnUpdateCart(this.dataObj,'add');
          }
      }
    },(res)=>{
    }))
  }

  ngOnDestroy() {
    debugger;
    this.subs.unsubscribe();
  }


}
