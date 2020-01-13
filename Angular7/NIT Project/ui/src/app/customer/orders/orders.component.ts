import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../shared/services/shared.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  products:any=[];
  isShowBtns:boolean=false;
  constructor(private shared:SharedService) { }

  ngOnInit() {
    let _products=sessionStorage.orders;
    if(_products){
      this.products=JSON.parse(_products);
    }else{
      this.shared.fnGetCustInfo(sessionStorage.id,'orders',(orders)=>{
        this.products=orders;
      });
    }
  }

}
