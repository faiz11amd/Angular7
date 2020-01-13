import { Injectable } from '@angular/core';
import {HttpInterceptor,HttpRequest,HttpHandler,HttpEvent,HttpResponse} from '@angular/common/http'
import { tap } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class IntercepterService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): import("rxjs").Observable<HttpEvent<any>> {
    let updatedRequest = request
    if (window.sessionStorage.token) {
      updatedRequest = request.clone({
        headers: request.headers.set("Authorization", window.sessionStorage.token)
      });
    }
    return next.handle(updatedRequest).pipe(
      tap(
        event => {
          //logging the http response to browser's console in case of a success
          if (event instanceof HttpResponse) {
            console.log("api call success :", event);
          }
        },
        error => {
          //logging the http response to browser's console in case of a failuer
          if (event instanceof HttpResponse) {
            console.log("api call error :", event);
          }
        }
      )
    );
  }

  constructor() { }
}
