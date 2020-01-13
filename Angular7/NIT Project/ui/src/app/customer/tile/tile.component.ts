import { Component, OnInit,Input } from '@angular/core';
import {Router} from '@angular/router'
import { ServercallService } from '../../shared/services/servercall.service';
import { SharedService } from '../../shared/services/shared.service';



@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {
 @Input('products') products ;
 @Input('isShowBtns') isShowBtns;
 timeStamp=new Date().getTime();
 imageBaseUrl = '';
  constructor(private router: Router,private serverCall:ServercallService,private shared:SharedService) {
    this.imageBaseUrl = this.serverCall.imageBaseUrl;
  }

  ngOnInit() {
  }

  fnBuyNow(pObj){
    let data={
      id:sessionStorage.id,
      product:pObj
    }
   
    this.serverCall.fnSendPostReq('users/buy-now',data)
    .subscribe((res:any)=>{
      if(res.modifiedCount > 0){
               this.shared.fnUpdateOrder(pObj);
               this.router.navigateByUrl('customer/order-success');
      }
    },(res)=>{
    })
  }

  fnRemoveFromCart(pObj){
    let data={
      id:sessionStorage.id,
      pid:pObj._id
    }
   
    this.serverCall.fnSendPostReq('users/remove-product-cart',data)
    .subscribe((res:any)=>{
      if(res.modifiedCount > 0){
        this.shared.fnSetToasterMsg('Your product removed from cart','green');
        this.products=this.shared.fnUpdateCart(pObj,'remove');
      }
    },(res)=>{
    })
  }
}
