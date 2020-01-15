import { Component, OnInit } from '@angular/core';
import { ServercallService } from '../../services/servercall.service'
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service'
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  dataObj:any = {};
  isShowLoader = false;
  constructor(private shared: SharedService, private router: Router, private serverCall: ServercallService) { }

  ngOnInit() {
  }

  fnLogin() {
    this.isShowLoader = true;
    this.serverCall.fnSendPostReq('users/login-check', { data: this.dataObj })
      .subscribe((res: any) => {
        this.isShowLoader = false;
        if (res.length == 0) {
          this.shared.fnSetToasterMsg("Please check entered uid or pwd", "red");
        }else{
          let user = res.data[0];
          let token=res.token;
          let role = user.role;
          sessionStorage.token=token;
          sessionStorage.uid = user.uid;
          sessionStorage.pwd = btoa(user.pwd);
          sessionStorage.role = role;
          sessionStorage.isLoggedIn = true;
          if (role == 'customer') {
            if (user.orders) {
              sessionStorage.setItem('orders', JSON.stringify(user.orders));
            }
            if (user.cart) {
              sessionStorage.setItem('cart', JSON.stringify(user.cart));
            }
            if (user.address) {
              sessionStorage.setItem('address', JSON.stringify(user.address));
            }
          }
          sessionStorage.setItem('id', user._id);
          this.router.navigateByUrl(role);
        }
      }, () => {
        this.isShowLoader = false;
        this.shared.fnSetToasterMsg("Something went wrong", "red");

      })
  }

}
