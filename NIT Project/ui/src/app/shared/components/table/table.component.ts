import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {ServercallService} from '../../services/servercall.service'
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() headers;
  @Input() data ;
  @Input() totalData;
  @Input() perPage ;
  @Input() keys ;
  @Input() hasImage;
  @Output() fnGetEditInfo= new EventEmitter();
  @Output() fnGetDeleteInfo= new EventEmitter();
  imgBasePath='';
  totalPages:number;
  currPage:number=1;
  timeStamp=new Date().getTime();
  constructor(private serverCall:ServercallService) { 
    this.imgBasePath=this.serverCall.imageBaseUrl;
  }

  ngOnInit() {
    this.totalPages=Math.ceil(this.totalData.length/this.perPage);
  }

  fnUpdateTable(){
    this.currPage=1;
    this.totalPages=Math.ceil(this.totalData.length/this.perPage);
  }
  fnEdit(row){
    this.fnGetEditInfo.emit(row);
  }
  

  fnDelete(row){
    let isOk=window.confirm('r u sure...');
    if(isOk){
      this.fnGetDeleteInfo.emit(row);
    }
  }

  fnGetOpt(data){
      switch(data.opt){
        case 'n':
           this.currPage++;
          break;
        case 'p':
          this.currPage--;
          break;
        default:
           this.currPage=data.goto;
          break;
      }
      this.fnPrepareData();
  }

  fnPrepareData(){
    let end=this.currPage*this.perPage;
    let start =end-this.perPage;
    this.data=this.totalData.slice(start,end);
  }

}
