import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { log } from 'console';
import { NewEventService } from '../../shared/services/new-event.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-new-event',
  standalone: true,
  imports: [NgSelectModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatOptionModule, RouterModule],
  templateUrl: './new-event.component.html',
  styleUrl: './new-event.component.css'
})
export class NewEventComponent implements OnInit {
  isChecked: boolean = false;
  eventForm!: FormGroup;
  name_ar!: string;
  name_en!: string;
  date!: any;
  location!: string;
  multi_use!: boolean;
  qr_image_count!: number;
  time!: string;
  type!: string;
  eventData: any;
  constructor(private _formBuilder: FormBuilder, private newEventService: NewEventService, private router:Router) { }
  ngOnInit(): void {
    this.initiate()
  }

  ticketsType = ['Gold', 'Blue', 'Green'];

  initiate() {
    this.eventForm = this._formBuilder.group({
      name_en: [''],
      name_ar: [''],
      date: ['', Validators.required],
      location: [''],
      multiUse: [false],
      qr_image_count: [''],
      time: [''],
      type: ['']
    })
  }

  eventDataAppend() {
    this.eventData = new FormData();
    this.eventData.append('name_ar', this.eventForm.controls['name_ar'].value);
    this.eventData.append('name_en', this.eventForm.controls['name_en'].value);
    this.eventData.append('date', this.eventForm.controls['date'].value);
    this.eventData.append('time', this.eventForm.controls['time'].value);
    this.eventData.append('location', this.eventForm.controls['location'].value);
    this.eventData.append('type', this.eventForm.controls['type'].value);
    this.eventData.append('multi_use', this.eventForm.get('multiUse')?.value ? 'true' : 'false');
    // const multiUseValue = this.eventForm.get('multiUse')?.value ? 'true' : 'false';
    // this.eventData.append('multi_use', multiUseValue);
    const multiUseValue = this.eventForm.get('multiUse')?.value;
    this.eventData.append('multi_use', multiUseValue === true ? '1' : '0');
    // this.eventData.append('multi_use', this.eventForm.controls['multi_use'].value);
    this.eventData.append('qr_image_count', this.eventForm.controls['qr_image_count'].value);
    console.log(this.name_ar);

  }

  onSubmit() {
    console.log("submitted");
    this.eventDataAppend();
    console.log(this.multi_use);
    console.log(this.name_ar);
    console.log(this.name_en);


    // console.log(this.eventData.values);
    this.eventData.forEach((value: any, key: any) => {
      console.log(`${key}: ${value}`);
    });

    this.newEventService.sendEventData(this.eventData).subscribe({
      next: (res) => {
        console.log(res)
        Swal.fire({
          icon: 'success',
          title: 'تم تسجيل البيانات بنجاح',
          showConfirmButton: false,
          timer: 1500,
        });
        this.newEventService.setData(res.qr_code_urls);
        this.router.navigate(['/qrPage']);
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'تأكد من ملئ جميع الخانات',
        });
      }
    })
  }

}
