import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ServercallService} from '../../services/servercall.service'
import {SharedService} from '../../services/shared.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isShowLoader=false;
  dataObj:any={};
  path='';
  showLoginLink=false;
  constructor(private shared:SharedService,private activatedRoute:ActivatedRoute,private serverCall:ServercallService) {
      if(window.location.pathname== '/register'){
        this.showLoginLink=true;
      }
   }


  ngOnInit() {
  }

  fnRegister(){
    this.isShowLoader=true;
    if(this.activatedRoute.snapshot){
      this.path=this.activatedRoute.snapshot.routeConfig.path
    }
    if(this.path=='create-vendor'){
      this.dataObj['role']='vendor';
    }else{
      this.dataObj['role']='customer';
    }
    this.serverCall.fnSendPostReq('users/reg-user',{"user":this.dataObj})
    .subscribe((res:any)=>{
      this.isShowLoader=false;
         if(res.insertedCount > 0){
           this.shared.fnSetToasterMsg(this.dataObj['role']+' Registerd Successfully','green');
           this.dataObj={};
          }else{
          if(res.isUserExist){
          this.shared.fnSetToasterMsg(res.msg,'red');
          }else{
          this.shared.fnSetToasterMsg('Not Inserted...try again','red');
          }
         }
    },(res)=>{
      this.isShowLoader=false;
        this.shared.fnSetToasterMsg('Something went wrong','red');

    })


  }

}
