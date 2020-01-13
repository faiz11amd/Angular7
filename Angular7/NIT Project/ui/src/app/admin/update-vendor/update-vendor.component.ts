import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {SharedService} from '../../shared/services/shared.service'
import {ServercallService} from '../../shared/services/servercall.service'
@Component({
  selector: 'app-update-vendor',
  templateUrl: './update-vendor.component.html',
  styleUrls: ['./update-vendor.component.css']
})
export class UpdateVendorComponent implements OnInit {
  dataObj:any={};
  isShowLoader=false;
  id='';
  constructor(private router:Router,private shared:SharedService,private activatedRouter:ActivatedRoute,private serverCall:ServercallService) {
    this.activatedRouter.params.subscribe((data)=>{
        this.id=data.id;

        if(this.id){
            this.isShowLoader=true;
            this.serverCall.fnSendGetReq('users/get-user-by-id?id='+this.id)
            .subscribe((res:any)=>{
              this.isShowLoader=false;
               if(res.length){
                  this.dataObj=res[0];
               }else{
                    this.shared.fnSetToasterMsg('No user found with this id','red');
               }
            },(data)=>{
              this.shared.fnSetToasterMsg('something went wrong','red');
              this.isShowLoader=false;
            })
        }
    })
  }
  fnCancel(){
    this.router.navigateByUrl('admin/vendor-list')
  }
  fnUpdate(){
      this.isShowLoader=true;
      delete this.dataObj['_id'];
      this.serverCall.fnSendPostReq('users/update-vendor?id='+this.id,{data:this.dataObj})
      .subscribe((res:any)=>{
        this.isShowLoader=false;
           if(res.modifiedCount > 0){
             this.shared.fnSetToasterMsg('Updated Successfully','green');
             this.router.navigateByUrl('admin/vendor-list');
            }else{
            this.shared.fnSetToasterMsg('Not updated...try again','red');
           }
      },(res)=>{
        this.isShowLoader=false;
          this.shared.fnSetToasterMsg('Something went wrong','red');

      })
    }
  ngOnInit() {
  }

}
