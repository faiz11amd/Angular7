import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {ServercallService} from '../../services/servercall.service';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent implements OnInit {
  dataObj:any={};
  isShowLoader=false;
  constructor(private shared: SharedService,private serverCall:ServercallService) { }

  ngOnInit() {
  }

  fnChangePwd(){
   let cPwd=window.atob(sessionStorage.pwd);
   let id=sessionStorage.id;
   if(cPwd != this.dataObj.cpwd){
     this.shared.fnSetToasterMsg('Please check enterd Current pwd','red');
     return;
   }
   this.isShowLoader=true;
   let dataObj={
     id:id,
     pwd:this.dataObj.npwd
   }

  this.serverCall.fnSendPostReq('users/change-pwd',dataObj)
  .subscribe((res:any)=>{
    this.isShowLoader=false;
       if(res.modifiedCount > 0){
         this.shared.fnLogout();
         this.shared.fnSetToasterMsg('Pwd updated Successfully','green');
        }else{
        this.shared.fnSetToasterMsg('Not updated...try again','red');
       }
  },(res)=>{
    this.isShowLoader=false;
      this.shared.fnSetToasterMsg('Something went wrong','red');

  })


  }

}
