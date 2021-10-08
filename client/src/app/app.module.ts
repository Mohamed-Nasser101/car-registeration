import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {VehicleFormComponent} from './components/vehicle-form/vehicle-form.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from "@angular/router";
import {ToastrModule} from "ngx-toastr";
import {AppErrorHandler} from "./helpers/appErrorHandler";
import {VehiclesComponent} from './components/vehicles/vehicles.component';
import {PaginationComponent} from './components/pagination/pagination.component';
import {VehiclePhotoComponent} from './components/vehicle-photo/vehicle-photo.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {RegiserationComponent} from './components/regiseration/regiseration.component';
import {LoginComponent} from './components/login/login.component';
import {ConfirmPasswordDirective} from './directives/confirm-password.directive';
import {AuthenticateInterceptor} from "./interceptors/authenticate.interceptor";

let routes: Routes = [
  {path: "", redirectTo: 'vehicles', pathMatch: "full"},
  {path: "vehicles", component: VehiclesComponent},
  {path: "vehicle/new", component: VehicleFormComponent},
  {path: "vehicle/:id", component: VehicleFormComponent},
  {path: "vehicle/:id/photos", component: VehiclePhotoComponent},
  {path: "register", component: RegiserationComponent},
  {path: "login", component: LoginComponent},
  {path: "**", component: VehiclesComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    VehicleFormComponent,
    VehiclesComponent,
    PaginationComponent,
    VehiclePhotoComponent,
    SpinnerComponent,
    RegiserationComponent,
    LoginComponent,
    ConfirmPasswordDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot({
      autoDismiss: true,
      closeButton: true,
      preventDuplicates: true,
      positionClass: 'toast-bottom-right'
    }),
  ],
  providers: [
    {provide: ErrorHandler, useClass: AppErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticateInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
