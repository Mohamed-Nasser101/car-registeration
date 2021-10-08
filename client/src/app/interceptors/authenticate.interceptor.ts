import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from "../services/user.service";

@Injectable()
export class AuthenticateInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let user = this.userService.getCurrentUser();
    if (user === null) return next.handle(request);
    let auth = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${user.token}`)
    });
    return next.handle(auth);
  }
}
