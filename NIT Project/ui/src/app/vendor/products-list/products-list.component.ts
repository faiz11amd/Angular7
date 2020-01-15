import { Component, OnInit,ViewChild,AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../../shared/services/shared.service';
import {ServercallService} from '../../shared/services/servercall.service';
import {TableComponent} from '../../shared/components/table/table.component';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit,AfterViewInit {
  hasProducts=false;
  isShowLoader=false;
  headers=['id','NAME','COST','DESCRIPTION'];
  data:any =[];
  totalData:any=[];
  perPage=2
  keys =['_id','name','cost','desc'];
  @ViewChild('tableData',null) tableRef:TableComponent;
 constructor(private router:Router,private shared:SharedService,private serverCall:ServercallService) { }


  ngOnInit() {
    this.fnGetProducts();
  }

  fnGetEditInfo(data){
    this.router.navigateByUrl(`vendor/update-product/${data._id}`)
  }
  ngAfterViewInit(){
    debugger;
    
  }
  fnGetDeleteInfo(data){
    this.isShowLoader=true;
    this.serverCall.fnSendGetReq('products/delete-product?id='+data._id)
    .subscribe((res:any)=>{
     this.isShowLoader=false;
        if(res.deletedCount > 0){
          this.shared.fnSetToasterMsg('deleted Successfully','green');
          this.fnGetProducts();
         }else{
         this.shared.fnSetToasterMsg('Not Delete...try again','red');
        }
   },(res)=>{
     this.isShowLoader=false;
       this.shared.fnSetToasterMsg('Something went wrong','red');
 
   })
  }

  fnGetProducts(){
    this.isShowLoader=true;
    this.serverCall.fnSendGetReq('products/my-products?vid='+sessionStorage.id)
    .subscribe((res:any)=>{
      this.isShowLoader=false;
      this.hasProducts=false;
        if(res.length > 0){
          debugger;
         this.totalData=res;
         this.data=this.totalData.slice(0,this.perPage);
         this.hasProducts=true;
         window.setTimeout(()=>{
          this.tableRef.fnUpdateTable();
         },0);
        }
       
  
    },()=>{
      this.isShowLoader=false;
    })
  
  }

}
