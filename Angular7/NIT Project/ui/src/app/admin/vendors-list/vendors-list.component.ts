import { Component, OnInit,ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {TableComponent} from '../../shared/components/table/table.component'
import {ServercallService} from '../../shared/services/servercall.service';
import {SharedService} from '../../shared/services/shared.service';
@Component({
  selector: 'app-vendors-list',
  templateUrl: './vendors-list.component.html',
  styleUrls: ['./vendors-list.component.css']
})
export class VendorsListComponent implements OnInit {
  @ViewChild('tableData',null) tableRef:TableComponent;
  hasVendors=false;
  isShowLoader=false;
  headers=['id','UID','PASSWORD','EMAIL','PHONE','ROLE']
  data:any =[];
  totalData:any=[];
  perPage=2
  keys =['_id','uid','pwd','email','phone','role']  
 constructor(private router:Router,private shared:SharedService,private serverCall:ServercallService) { }

 ngOnInit() {
      this.fnGetUsers();
 }

 fnGetUsers(){
   this.isShowLoader=true;
  this.serverCall.fnSendGetReq('users/get-users?role=vendor')
  .subscribe((res:any)=>{
    this.isShowLoader=false;
    this.hasVendors=false;
      if(res.length > 0){
       this.totalData=res;
       this.data=this.totalData.slice(0,this.perPage);
       this.hasVendors=true;
       window.setTimeout(()=>{
        this.tableRef.fnUpdateTable();
       },0);
      }
     

  },()=>{
    this.isShowLoader=false;
  })
 }


 fnGetEditInfo(data){
   this.router.navigateByUrl(`admin/update-vendor/${data._id}`)
 }

 fnGetDeleteInfo(data){
   this.isShowLoader=true;
   this.serverCall.fnSendGetReq('users/delete-user?id='+data._id)
   .subscribe((res:any)=>{
    this.isShowLoader=false;
       if(res.deletedCount > 0){
         this.shared.fnSetToasterMsg('deleted Successfully','green');
         this.fnGetUsers();
        }else{
        this.shared.fnSetToasterMsg('Not Delete...try again','red');
       }
  },(res)=>{
    this.isShowLoader=false;
      this.shared.fnSetToasterMsg('Something went wrong','red');

  })
 }

}
