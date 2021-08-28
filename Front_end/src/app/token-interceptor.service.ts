import { Injectable, Injector } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private injector: Injector){}
  intercept(req, next) {
    let authService = this.injector.get(AuthServiceService)
    let tokenizedReq = req.clone(
      {
        headers: req.headers.set('Authorization', 'bearer ' + authService.getToken())
      }
    )
    return next.handle(tokenizedReq)
  }
}
