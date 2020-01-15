import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Output() fnSendOpt=new EventEmitter();
  @Input() currPage;
  @Input() totalPages;
  goto:string;
  constructor() { }

  ngOnInit() {
  }

  fnOpt(opt){ 
    this.fnSendOpt.emit({opt:opt,goto:this.goto});
  }

}
