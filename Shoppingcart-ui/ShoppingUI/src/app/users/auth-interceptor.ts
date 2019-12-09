import { HTTP_INTERCEPTORS, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    token:string;
    constructor(public auth: AuthService) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>  {
    this.token=this.auth.getToken();
       const request=req.clone({
           setHeaders:{Authorization:`Bearer ${this.token}`}
       })
        return next.handle(request);
    }

}