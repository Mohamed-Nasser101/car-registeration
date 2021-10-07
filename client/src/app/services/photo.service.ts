import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Photo} from "../models/photo";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  url = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  addPhotos(id: number, file: any) {
    let form = new FormData();
    form.append('file', file);
    return this.http.post<Photo>(`${this.url}/vehicles/${id}/photos`, form, {
      observe: 'events',
      reportProgress: true
    });
  }

  getPhotos(id: number) {
    return this.http.get<Photo[]>(`${this.url}/vehicles/${id}/photos`);
  }
}
