import { Component } from '@angular/core';
import {Router,NavigationEnd} from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'osui';
  currentUrl='';
 constructor(private router:Router){
  this.router.events.subscribe((event: any)=>{
    if (event instanceof NavigationEnd ) {
      debugger;
      let isLoggedIn=sessionStorage.isLoggedIn;
      let id=sessionStorage.id;
      let role=sessionStorage.role;
      this.currentUrl = event.url;

      switch(this.currentUrl){
        case '/login':
        case '/register':
              if(isLoggedIn && id){
                  this.router.navigateByUrl(role);
              }
          break;
        default:
            if(!isLoggedIn || !id){
              this.router.navigateByUrl('login');
          }
          break;
      }

      if(role && !this.currentUrl.includes(role)){
        this.router.navigateByUrl(role);
      }


    }
  });
  
 }
}
