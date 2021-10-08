import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor(public userService: UserService) {
  }

  logout(e: Event) {
    e.preventDefault();
    this.userService.logout();
  }
}
