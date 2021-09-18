import {ErrorHandler, Inject, Injectable, Injector, NgZone, isDevMode} from "@angular/core";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  constructor(@Inject(Injector) private injector: Injector, private zone: NgZone) {
  }

  private get toastr(): ToastrService {
    return this.injector.get(ToastrService);
  }

  handleError(error: any): void {
    if (isDevMode()) {
      //do something
    }
    this.zone.run(() => {
      console.log(error);
      this.toastr.error("some error occured", 'Error', {
        closeButton: true,
        positionClass: 'toast-bottom-right',
      });
    });
  }
}
