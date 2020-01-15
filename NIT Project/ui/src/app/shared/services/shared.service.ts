import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ServercallService } from './servercall.service'
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  products: any = [];
  private toasterMsgSub = new Subject();
  private searchTextSub=new Subject();
  constructor(private router: Router, private serverCall: ServercallService) { }
  
  fnSetSearchText(text) {
    this.searchTextSub.next(text);
  }
  fnSearchObservable() {
    return this.searchTextSub.asObservable();
  }
  fnSetToasterMsg(msg, clr) {
    let dataObj = {
      'msg': msg,
      'bg': clr
    }
    this.toasterMsgSub.next(dataObj);
  }
  fnToasterObservable() {
    return this.toasterMsgSub.asObservable();
  }

  fnLogout() {
    sessionStorage.clear();
    this.router.navigateByUrl('login');
  }

  fnValidateFile(file) {
    let extention = file.split('.').pop();
    if (extention == 'jpg') {
      return true;
    }
    return false;
  }

  fnGetCustInfo(cid, opt, cb) {
    this.serverCall.fnSendGetReq('users/get-cust-info?id=' + cid)
      .subscribe((res: any) => {
        debugger;
        if (res.orders) {
          sessionStorage.setItem('orders', JSON.stringify(res.orders));
        }
        if (res.cart) {
          sessionStorage.setItem('cart', JSON.stringify(res.cart));
        }
        if (res.address) {
          sessionStorage.setItem('address', JSON.stringify(res.address));
        }
        if (opt == 'orders') {
          cb(res.orders);
        } else {
          cb(res.cart);
        }

      }, (res) => {
        debugger;
      })
  }

  fnCheckInCart(pid) {
    let myCartinfo = sessionStorage.cart;
    if (myCartinfo) {
      myCartinfo = JSON.parse(myCartinfo);
      let productObj = myCartinfo.find((pObj) => {
        return pObj._id == pid;
      })
      if (productObj) {
        return true;
      }
    }
    return false;

  }
  fnUpdateOrder(dataObj) {
    let myOrdersInfo = sessionStorage.orders;
    if (myOrdersInfo) {
      myOrdersInfo = JSON.parse(myOrdersInfo);
      myOrdersInfo.push(dataObj);
      sessionStorage.setItem('orders', JSON.stringify(myOrdersInfo));
    } else {
      sessionStorage.setItem('orders', JSON.stringify([dataObj]));
    }
  }

  fnUpdateCart(dataObj, opt) {
    let myCartInfo = sessionStorage.cart;
    myCartInfo = JSON.parse(myCartInfo);
    if (opt == 'add') {
      if (myCartInfo) {
        myCartInfo.push(dataObj);
        sessionStorage.setItem('cart', JSON.stringify(myCartInfo));
      } else {
        sessionStorage.setItem('cart', JSON.stringify([dataObj]));
      }
    } else {
       let index=myCartInfo.findIndex((pObj)=>{
          return pObj._id == dataObj._id;
       });
       myCartInfo.splice(index,1);
       sessionStorage.setItem('cart', JSON.stringify(myCartInfo));
    }
    return myCartInfo;
  }

}
