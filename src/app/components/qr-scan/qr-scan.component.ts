import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { HomeService } from '../../shared/services/home.service';
import { ActivatedRoute } from '@angular/router';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-qr-scan',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ZXingScannerModule,
    MatPaginatorModule,
    NgxPaginationModule,
  ],
  templateUrl: './qr-scan.component.html',
  styleUrl: './qr-scan.component.css',
})
export class QrScanComponent implements OnInit, AfterViewInit {
  [x: string]: any;
  tokenExists!: boolean;
  name!: string;
  location!: string;
  date!: string;
  type!: string;
  time!: string;
  multi_use!: number;
  eventForm!: FormGroup;
  eventData: any;
  data!: FormGroup;
  ticketsType = ['Gold', 'Blue', 'Green'];
  qrCodes: any;
  qrResult: string | null = null;
  scannerEnabled = false;
  qr_code_urls: any;
  currentPage = 0;

  allItems: any[] = [];
  displayedItems: any[] = [];
  pageSize = 10;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _authService: AuthService,
    private _homeService: HomeService,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) {}
  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => this.updateDisplayedItems());
  }
  ngOnInit(): void {
    this.checkForToken();
    this.getQRCodes();

    // this.updateDisplayedItems();

    this.eventForm = this._formBuilder.group({
      name_en: [this.name, Validators.required],
      name_ar: ['', Validators.required],
      location: [this.location, Validators.required],
      date: [this.date, Validators.required],
      type: [this.type, Validators.required],
      time: [this.time, Validators.required],
      multiUse: [this.multi_use, Validators.required],
      qr_image_count: ['', Validators.required],
    });
  }

  updateDisplayedItems() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.displayedItems = this.allItems.slice(startIndex, endIndex);
  }

  getQRCodes() {
    const eventId = this.route.snapshot.paramMap.get('id');

    this._homeService.getQR(eventId).subscribe({
      next: (res) => {
        console.log(res);
        this.name = res.data.name_en;
        this.location = res.data.location;
        this.date = res.data.date;
        this.type = res.data.type;
        this.time = res.data.time;
        this.multi_use = res.data.multi_use;
        this.qrCodes = res.data;
        this.allItems = res.data.qr_code_urls;
        // this.qr_code_urls = res.data.qr_code_urls;
        this.updateDisplayedItems();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // Enable the scanner when the scan button is clicked
  startScan() {
    this.scannerEnabled = true;
  }
  // Handle the scanned QR code result
  handleQrCodeResult(result: string) {
    this.qrResult = result;
    this.scannerEnabled = false;
    console.log(this.qrResult);
  }

  checkForToken() {
    this._authService.token$.subscribe((token) => {
      // Update the tokenExists flag based on the token presence
      this.tokenExists = token != null;
    });
  }

  // eventDataAppend() {
  //   this.eventData = new FormData();
  //   this.eventData.append('name_ar', this.eventForm.controls['name_ar'].value);
  //   this.eventData.append('name_en', this.eventForm.controls['name_en'].value);
  //   this.eventData.append('date', this.eventForm.controls['date'].value);
  //   this.eventData.append('time', this.eventForm.controls['time'].value);
  //   this.eventData.append('location', this.eventForm.controls['location'].value);
  //   this.eventData.append('type', this.eventForm.controls['type'].value);
  //   // this.eventData.append('multi_use', this.eventForm.get('multiUse')?.value ? 'true' : 'false');
  //   const multiUseValue = this.eventForm.get('multiUse')?.value;
  //   this.eventData.append('multi_use', multiUseValue === true ? '1' : '0');
  //   this.eventData.append('qr_image_count', this.eventForm.controls['qr_image_count'].value);
  // }

  onSubmit() {}

  // getQrCode(id: any, location: string,
  //   date: string,
  //   time: string,
  //   type: string,
  //   multi_use: number,
  //   name_ar: string,
  //   name_en: string) {
  //   // this.token = localStorage.getItem("token");
  //   this._homeService.getQR(id).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   })
  // }

  title = 'pagination';
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  onTableDataChange(event: any) {
    this.page = event;
    this.getQRCodes();
  }

  handlePageEvent(pageEvent: PageEvent) {
    console.log(pageEvent);
  }
}
