import {Feature} from '../models/Feature';
import {Make} from '../models/Make';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ServerVehicle, Vehicle} from "../models/vehicle";
import {Query} from "../models/query";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  url = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getMakes() {
    return this.http.get<Make[]>(`${this.url}/Makes`);
  }

  getFeature() {
    return this.http.get<Feature[]>(`${this.url}/features`);
  }

  addVehicle(vehicle: Vehicle) {
    return this.http.post<Vehicle>(`${this.url}/vehicles`, vehicle);
  }

  getVehicle(id: number) {
    return this.http.get<ServerVehicle>(`${this.url}/vehicles/${id}`);
  }

  getVehicles(query: Query) {
    let params = this.setParams(query);
    return this.http.get<ServerVehicle[]>(`${this.url}/vehicles`, {observe: 'response', params});
  }

  updateVehicle(vehicle: Vehicle) {
    return this.http.put<Vehicle>(`${this.url}/vehicles/${vehicle.id}`, vehicle);
  }

  deleteVehicle(id: number) {
    return this.http.delete(`${this.url}/vehicles/${id}`, {observe: "response"});
  }



  setVehicle(serverVehicle: ServerVehicle): Vehicle {
    let vehicle: Vehicle = {
      id: 0,
      modelId: 0,
      features: [],
      isRegistered: false,
      contact: {name: "", email: "", phone: ""}
    };
    vehicle.id = serverVehicle.id;
    vehicle.isRegistered = serverVehicle.isRegistered;
    vehicle.modelId = serverVehicle.modelId;
    vehicle.features = serverVehicle.features.map(f => f.id);
    vehicle.contact = serverVehicle.contact;
    return vehicle;
  }

  private setParams(query: Query) {
    let params = new HttpParams();
    params = params.append('makeId', query.makeId);
    params = params.append('currentPage', query.currentPage);
    params = params.append('itemPerPage', query.itemPerPage);
    params = params.append('sortType', query.sortType);
    params = params.append('isAscending', query.isAscending);

    return params;
  }
}
