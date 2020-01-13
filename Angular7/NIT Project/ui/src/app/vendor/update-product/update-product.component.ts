import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../shared/services/shared.service'
import { ServercallService } from '../../shared/services/servercall.service'
import { FileUploader } from 'ng2-file-upload'
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  dataObj:any = {};
  timeStamp=new Date().getTime();

  uploader: FileUploader;
  isShowLoader = false;
  id = '';
  imageBaseUrl = '';
  fileInfo:any;
  @ViewChild('file', null) file: ElementRef;
  constructor(private router: Router, private shared: SharedService, private activatedRouter: ActivatedRoute, private serverCall: ServercallService) {
    this.imageBaseUrl = this.serverCall.imageBaseUrl;
    this.uploader = new FileUploader({ url: this.serverCall.baseUrl + 'products/upload', itemAlias: 'photo' });
    this.activatedRouter.params.subscribe((data) => {
      this.id = data.pid;
      if (this.id) {
        this.isShowLoader = true;
        this.serverCall.fnSendGetReq('products/product-info?id=' + this.id)
          .subscribe((res: any) => {
            this.isShowLoader = false;
            if (res.length) {
              this.dataObj = res[0];
            } else {
              this.shared.fnSetToasterMsg('No Product found with this id', 'red');
            }
          }, (data) => {
            this.shared.fnSetToasterMsg('something went wrong', 'red');
            this.isShowLoader = false;
          })
      }
    })
  }
  fnCancel() {
    this.router.navigateByUrl('vendor/products-list')
  }
  fnUpdate() {
    debugger;
  let fileQueInfo = this.uploader.queue;
    if (fileQueInfo.length) {
      this.fileInfo = fileQueInfo[0].file;
      let isValid = this.shared.fnValidateFile(this.fileInfo['name']);
      if (!isValid) {
        this.shared.fnSetToasterMsg('Please select .jpg files only', 'red');
        this.file.nativeElement.value = '';
        fileQueInfo.pop();
        return;
      }
    }
    this.isShowLoader = true;
    delete this.dataObj['_id'];
    this.serverCall.fnSendPostReq('products/update-product?id=' + this.id, { data: this.dataObj })
      .subscribe((res: any) => {
        this.isShowLoader = false;
        if (res.modifiedCount > 0 || (res.result.ok == 1)) {
          if (fileQueInfo.length) {
            this.fileInfo['name'] = this.id + '.jpg';
            this.uploader.uploadAll();
          }
          this.shared.fnSetToasterMsg('Updated Successfully', 'green');
          this.router.navigateByUrl('vendor/products-list');
        } else {
          this.shared.fnSetToasterMsg('Not updated...try again', 'red');
        }
      }, (res) => {
        this.isShowLoader = false;
        this.shared.fnSetToasterMsg('Something went wrong', 'red');

      })
  }
  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
  }

}
