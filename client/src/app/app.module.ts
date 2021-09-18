import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {VehicleFormComponent} from './components/vehicle-form/vehicle-form.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from "@angular/router";
import {ToastrModule} from "ngx-toastr";
import {AppErrorHandler} from "./helpers/appErrorHandler";
import {VehiclesComponent} from './components/vehicles/vehicles.component';

let routes: Routes = [
  {path: "", redirectTo: 'vehicles', pathMatch: "full"},
  {path: "vehicles", component: VehiclesComponent},
  {path: "vehicle/new", component: VehicleFormComponent},
  {path: "vehicle/:id", component: VehicleFormComponent},
  {path: "**", component: VehiclesComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    VehicleFormComponent,
    VehiclesComponent
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
    })
  ],
  providers: [
    {provide: ErrorHandler, useClass: AppErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
