import { Feature } from './../models/Feature';
import { Make } from './../models/Make';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  url = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getMakes() {
    return this.http.get<Make[]>(`${this.url}/Makes`);
  }
  getFeature() {
    return this.http.get<Feature[]>(`${this.url}/features`);
  }
}
