import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, throwError} from "rxjs";
import {User} from "../models/user";
import {RegisterModel} from "../models/registerModel";
import {catchError, map} from "rxjs/operators";
import {Router} from "@angular/router";
import {LoginModel} from "../models/loginModel";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.baseUrl;
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    let user = this.getCurrentUser();
    if (user !== null) {
      this.user.next(user);
    }
  }

  register(model: RegisterModel) {
    return this.http.post<User>(`${this.url}/Account/register`, model).pipe(
      catchError(err => {
        return throwError(err);
      }),
      map(user => {
        if (!user) return false;
        this.user.next(user);
        let result = JSON.stringify(user);
        localStorage.setItem('user', result);
        return true;
      }));
  }

  login(model: LoginModel) {
    return this.http.post<User>(`${this.url}/Account/login`, model).pipe(
      catchError(err => {
        return throwError(err);
      }),
      map(user => {
        if (!user) return false;
        this.user.next(user);
        let result = JSON.stringify(user);
        localStorage.setItem('user', result);
        return true;
      }));
  }

  getCurrentUser() {
    let user = localStorage.getItem('user');
    if (user === null || user === '') return null;
    let currentUser: User = JSON.parse(user);
    return currentUser;
  }

  logout() {
    localStorage.removeItem('user');
    this.user.next(null);
    this.router.navigateByUrl('/login');
  }
}
