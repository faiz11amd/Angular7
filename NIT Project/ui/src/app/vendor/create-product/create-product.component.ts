import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import {ServercallService} from '../../shared/services/servercall.service'
import {SharedService} from '../../shared/services/shared.service'
import { FileUploader } from 'ng2-file-upload';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  dataObj:any={};
  isShowLoader=false;
  uploader:FileUploader;
  @ViewChild('file',null) file;
  constructor(private shared:SharedService, private serverCall:ServercallService) {
    this.uploader= new FileUploader({url:this.serverCall.baseUrl+'products/upload',itemAlias:'photo'});
   }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
       file.withCredentials = false;
      };

  }

  fnSubmit(){
    let fileQueInfo=this.uploader.queue;
    if(!fileQueInfo.length){
      this.shared.fnSetToasterMsg('Please select Image','red');
      return;
    }
    let file=fileQueInfo[0].file;
    let isValid=this.shared.fnValidateFile(file.name);
    if(!isValid){
      this.shared.fnSetToasterMsg('Please select .jpg files only','red');
      this.file.nativeElement.value='';
      return;
    }
    this.isShowLoader=true;
    this.dataObj['vid']=sessionStorage.id;
    this.dataObj['vname']=sessionStorage.uid;
    this.serverCall.fnSendPostReq('products/create-product',{"data":this.dataObj})
    .subscribe((res:any)=>{
      this.isShowLoader=false;
         if(res.insertedCount > 0){
           debugger;
           file.name=res.insertedId+'.jpg';
           this.uploader.uploadAll();
           this.shared.fnSetToasterMsg('Product created Successfully','green');
           this.dataObj={};
           this.file.nativeElement.value='';
           fileQueInfo.pop();
          }else{
          this.shared.fnSetToasterMsg('Not Inserted...try again','red');
         }
    },(res)=>{
      this.isShowLoader=false;
        this.shared.fnSetToasterMsg('Something went wrong','red');

    })
  }

}
