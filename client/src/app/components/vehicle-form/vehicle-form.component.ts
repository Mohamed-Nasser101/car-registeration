import {Model} from '../../models/model';
import {Make} from '../../models/Make';
import {VehicleService} from '../../services/vehicle.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Feature} from 'src/app/models/Feature';
import {ActivatedRoute, Router} from "@angular/router";
import {ServerVehicle, Vehicle} from "../../models/vehicle";
import {ToastrService} from "ngx-toastr";
import {forkJoin, Observable} from "rxjs";

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  makes: Make[];
  features: Feature[];
  selectedModels: Model[] | undefined;
  editMode = false;
  vehicle: Vehicle = {id: 0, modelId: 0, features: [], isRegistered: false, contact: {name: "", email: "", phone: ""}};
  serverVehicle: ServerVehicle;

  constructor(private vehicleService: VehicleService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
    let source: Observable<any>[] = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeature()
    ];

    this.editMode = this.route.snapshot.url[1]?.path !== 'new';

    if (this.editMode) {
      source.push(this.vehicleService.getVehicle(+this.route.snapshot.url[1].path));
    }

    forkJoin(source).subscribe(data => {
      this.makes = data[0];
      this.features = data[1];
      if (this.editMode) {
        this.serverVehicle = data[2];
        this.vehicle = this.vehicleService.setVehicle(data[2]);
        this.SelectMake(this.serverVehicle.make.id.toString());
      }
    });
  }

  SelectMake(index: string) {
    this.selectedModels = this.makes.find(m => m.id === +index)?.models;
  }

  SubmitForm() {
    if (this.form.invalid) {
      this.toastr.error("invalid form");
      return;
    }
    // let vehicle = this.extractVehicle(this.form.value);
    if (this.editMode) {
      this.vehicleService.updateVehicle(this.vehicle).subscribe(vehicle => {
        this.toastr.success('updated successfully');
        this.vehicle = vehicle;
      });
    } else {
      this.vehicleService.addVehicle(this.vehicle).subscribe(
        res => console.log(res)
        // err => this.toastr.error("some error occured") moved to global error handler
      );
    }
  }

  // extractVehicle(element: any): Vehicle {
  //   let features = Object.keys(element).filter(k => k.includes('feature-'));
  //   let selectedFeatures: number[] = [];
  //   features.forEach(feature => {
  //     if (element[feature] == true) {
  //       selectedFeatures.push(+feature.slice(8));
  //     }
  //   });
  //   return {
  //     modelId: +element.model,
  //     isRegistered: element.register == 'yes',
  //     contact: {
  //       name: element.name,
  //       phone: element.phone,
  //       email: element.email,
  //     },
  //     features: selectedFeatures
  //   };
  // }

  toggleFeature(id: number, $event: Event) {
    if ((<HTMLInputElement>$event.currentTarget).checked) {
      this.vehicle.features.push(id);
    } else {
      let index = this.vehicle.features.indexOf(id);
      this.vehicle.features.splice(index, 1);
    }
  }

  delete() {
    if (confirm('sure you want to delete this vehicle?')) {
      this.vehicleService.deleteVehicle(this.vehicle.id).subscribe(res => {
        if (res.status == 200) {
          this.toastr.success('vehicle deleted');
          this.router.navigate(['/vehicle/new'])
        }
      });
    }
  }
}
