import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RegisterModel} from "../../models/registerModel";
import {NgForm} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-regiseration',
  templateUrl: './regiseration.component.html',
  styleUrls: ['./regiseration.component.css']
})
export class RegiserationComponent implements OnInit, OnDestroy {
  registerModel: RegisterModel = {email: "", password: "", username: ""};
  @ViewChild('f') registerForm: NgForm;
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

  register() {
    if (this.registerForm.invalid) return;
    this.userService.register(this.registerModel).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/vehicles');
      }
    }, errs => {
      let result = '';
      for (const err of errs.error) {
        result += err.description + '\n';
      }
      this.toastr.error(result, 'Error', {
        closeButton: true,
        positionClass: 'toast-bottom-right',
      });
    });
  }
}
