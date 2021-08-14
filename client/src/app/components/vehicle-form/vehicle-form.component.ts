import { Model } from './../../models/model';
import { Make } from './../../models/Make';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Feature } from 'src/app/models/Feature';

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
  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicleService.getMakes().subscribe(makes => {
      this.makes = makes;
    });

    this.vehicleService.getFeature().subscribe(features => {
      this.features = features;
    });
  }

  SelectMake(index: string) {
    this.selectedModels = this.makes.find(m => m.id === +index)?.models;
  }
  SubmitForm() {
    if (this.form.invalid) {
      alert('invalid');
      return;
    }
    console.log(this.form.value);
  }
}
