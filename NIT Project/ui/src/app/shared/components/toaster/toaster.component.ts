import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../services/shared.service';
@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent implements OnInit {
  isShowToaster:boolean=false;
  msg:string="";
  bgObj={
    background:''
  }
  timeout:any;
  constructor(public shared:SharedService) { 
      
      this.shared.fnToasterObservable().subscribe((data:any)=>{
            this.isShowToaster=true;
            this.msg=data.msg;
            this.bgObj={
              background:data.bg
            }
            this.timeout=setTimeout(()=>{
                 this.isShowToaster=false;
            },10000);

      })
  }

  fnCloseToaster(){
     this.isShowToaster=false;
     clearTimeout(this.timeout);
    
  }
  ngOnInit() {
  }

}
