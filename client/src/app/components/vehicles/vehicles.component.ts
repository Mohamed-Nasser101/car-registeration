import {Component, OnInit} from '@angular/core';
import {ServerVehicle, Vehicle} from "../../models/vehicle";
import {VehicleService} from "../../services/vehicle.service";
import {ToastrService} from "ngx-toastr";
import {Make} from "../../models/Make";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: ServerVehicle[];
  makes: Make[];

  constructor(private vehicleService: VehicleService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    forkJoin([this.vehicleService.getMakes(), this.vehicleService.getVehicles(0)]).subscribe(data => {
      this.makes = data[0];
      this.vehicles = data[1];
    });
  }

  deleteVehicle(e: Event, id: number) {
    e.preventDefault();
    if (confirm('sure you want to delete this vehicle?')) {
      this.vehicleService.deleteVehicle(id).subscribe(res => {
        if (res.status == 200) {
          this.toastr.success('vehicle deleted');
          this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== id);
        }
      });
    }
  }

  filter(value: string) {
    this.vehicleService.getVehicles(+value).subscribe(vehicle => this.vehicles = vehicle);
  }
}
