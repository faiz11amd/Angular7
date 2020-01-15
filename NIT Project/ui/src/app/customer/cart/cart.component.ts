import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../shared/services/shared.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products:any=[];
  isShowBtns:boolean=true;
  constructor(private shared:SharedService) { }

  ngOnInit() {
    let _products=sessionStorage.cart;
    if(_products){
      this.products=JSON.parse(_products);
    }else{
      this.shared.fnGetCustInfo(sessionStorage.id,'cart',(cart)=>{
        this.products=cart;
      });
    }
  }

}
