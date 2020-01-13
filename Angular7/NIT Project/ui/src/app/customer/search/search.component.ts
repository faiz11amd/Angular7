import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../shared/services/shared.service'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchText='';
  constructor(private shared:SharedService) { }

  ngOnInit() {

  }
  fnSearch(){
    this.shared.fnSetSearchText(this.searchText);
  }

}
