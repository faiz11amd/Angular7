import { Component, OnInit } from '@angular/core';
import {ServercallService} from '../../shared/services/servercall.service';
import {SharedService} from '../../shared/services/shared.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  custObj:any={};
  addressArr=[];
  addressObj:any={};
  constructor(private serverCall:ServercallService,private shared:SharedService) { }

  ngOnInit() {
    this.fnGetCustmerDetails();
  }

  fnGetCustmerDetails(){
    this.serverCall.fnSendGetReq('users/get-cust-info?id=' + sessionStorage.id)
    .subscribe((res)=>{
      debugger;
      this.custObj=res;
      this.addressObj=this.custObj['address'];
      for(var i=0;i<Object.keys(this.addressObj).length ;i++){
        this.addressArr.push('');
      }

    },(res)=>{

    })

  }

  fnAddAddress(){
        this.addressArr.push('');
  }

  fnSubmit(){
    debugger;
    let dataObj={
      cid:sessionStorage.id,
      address:this.addressObj
    }
    this.serverCall.fnSendPostReq('users/update-address',dataObj)
    .subscribe((res:any)=>{
      if(res.modifiedCount > 0){
        this.shared.fnSetToasterMsg('address Updated Successfully','green');
       }else{
       this.shared.fnSetToasterMsg('Not updated...try again','red');
      }
    },()=>{

    })
  }

}
