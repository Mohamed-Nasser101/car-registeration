import {Component, OnInit} from '@angular/core';
import {ServerVehicle, Vehicle} from "../../models/vehicle";
import {VehicleService} from "../../services/vehicle.service";
import {ToastrService} from "ngx-toastr";
import {Make} from "../../models/Make";
import {forkJoin} from "rxjs";
import {Query} from '../../models/query';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: ServerVehicle[];
  makes: Make[];
  pageCount: any;
  query: Query = {makeId: 0, currentPage: 1, isAscending: true, itemPerPage: 3, sortType: 'make'};

  constructor(private vehicleService: VehicleService, private toastr: ToastrService, public userService: UserService) {
  }

  ngOnInit(): void {
    forkJoin([
      this.vehicleService.getMakes(),
      this.vehicleService.getVehicles(this.query)
    ]).subscribe(data => {
      this.makes = data[0];
      this.vehicles = data[1].body as ServerVehicle[];
      let pagination = JSON.parse(data[1].headers.get('pagination') ?? '');
      this.pageCount = pagination.pageCount;
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

  filter() {
    this.vehicleService.getVehicles(this.query)
      .subscribe(data => {
        this.vehicles = data.body as ServerVehicle[];
        this.pageCount = JSON.parse(data.headers.get('pagination') ?? '').pageCount;
      });
  }

  setSort(type: string) {
    if (this.query.sortType == type) this.query.isAscending = !this.query.isAscending;
    else this.query.isAscending = true;
    this.query.sortType = type;
    this.filter();
  }

  changePage(page: number) {
    this.query.currentPage = page;
    this.filter();
  }

  resetFilter() {
    this.query.currentPage = 1;
    this.filter();
  }
}
