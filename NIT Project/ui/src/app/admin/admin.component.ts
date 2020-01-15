import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared/services/shared.service'
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  timer: any;
  name=window.sessionStorage.uid;
  constructor(private shared:SharedService) { 
    window.addEventListener('resize', () => {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setMenuView();
      }, 200);
    });
  }

  ngOnInit() {
    this.setMenuView();
  }
  fnLogout() {
    this.shared.fnLogout();
  }
  fnMobileMenuBtnClick() {
    var menuRef = document.querySelector('.mobile-menu');
    if (menuRef && menuRef.classList.contains('show-mobile-menu')) {
      menuRef.classList.remove('show-mobile-menu')
    } else {
      menuRef.classList.add('show-mobile-menu')
    }
  }
  fnMenuClick() {
    var menuRef = document.querySelector('.mobile-menu');
    if (menuRef) {
      menuRef.classList.remove('show-mobile-menu');
    }
  }




  setMenuView() {
    var _bodyWidth = document.body.clientWidth;
    var menuRef = document.querySelector('#menu');
    if (menuRef) {
      if (_bodyWidth < 750) {
        menuRef.classList.add('mobile-menu')
      } else {
        menuRef.classList.remove('mobile-menu')
      }
    }
  }

}
