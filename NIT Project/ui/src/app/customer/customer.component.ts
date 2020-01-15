import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared/services/shared.service'
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  name=window.sessionStorage.uid;
  constructor(private shared:SharedService) { }

  ngOnInit() {
  }

  fnLogout() {
    this.shared.fnLogout();
  }

 

}
