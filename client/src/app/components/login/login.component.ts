import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LoginModel} from "../../models/loginModel";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../regiseration/regiseration.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginModel: LoginModel = {password: "", username: ""};
  @ViewChild('f') loginForm: NgForm;
  userSub: Subscription;

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.userService.user$.subscribe(user => {
      if (user !== null) {
        this.router.navigateByUrl('/vehicles');
      }
    });
  }

  login() {
    if (this.loginForm.invalid) return;
    this.userService.login(this.loginModel).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/vehicles');
      }
    }, err => {
      this.toastr.error(err.error.title, 'Error', {
        closeButton: true,
        positionClass: 'toast-bottom-right',
      });
    });
  }
}
