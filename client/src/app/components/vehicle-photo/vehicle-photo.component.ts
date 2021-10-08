import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PhotoService} from "../../services/photo.service";
import {Photo} from "../../models/photo";
import {HttpEventType} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-vehicle-photo',
  templateUrl: './vehicle-photo.component.html',
  styleUrls: ['./vehicle-photo.component.css']
})
export class VehiclePhotoComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  id: number;
  photos: Photo[];
  loading = true;
  progress: number;
  uploading = false;
  uploadSubscription: Subscription;

  constructor(private photoService: PhotoService, private route: ActivatedRoute, private toastr: ToastrService,
              public userService: UserService) {
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.photoService.getPhotos(this.id).subscribe(photos => {
      this.photos = photos;
      this.loading = false;
    });
  }

  uploadFiles() {
    let element: HTMLInputElement = this.fileInput.nativeElement;
    if (element.files) {
      this.uploadSubscription = this.photoService.addPhotos(this.id, element.files[0]).subscribe(photo => {
        this.uploading = true;
        switch (photo.type) {
          case HttpEventType.Response:
            if (photo.body) {
              this.photos.push(photo.body);
              this.uploading = false;
            }
            break;
          case HttpEventType.UploadProgress:
            console.log(`${Math.round(photo.loaded / (photo.total ?? 10000000) * 100)}%`);
            this.progress = Math.round(photo.loaded / (photo.total ?? 10000000) * 100);
            break;
        }
      }, err => {
        this.uploading = false;
        this.toastr.error(err.error, 'Error', {
          closeButton: true,
          positionClass: 'toast-bottom-right',
        });
      })
    }
  }

  cancelUpload() {
    this.uploadSubscription.unsubscribe();
    this.uploading = false;
  }
}
