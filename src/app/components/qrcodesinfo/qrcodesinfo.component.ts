import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../shared/services/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qrcodesinfo',
  standalone: true,
  imports: [],
  templateUrl: './qrcodesinfo.component.html',
  styleUrl: './qrcodesinfo.component.css'
})
export class QrcodesinfoComponent implements OnInit {
  name!: string;
  location!: string;
  date!: string;
  type!: string;
  time!: string;
  multi_use!: number;

  eventData: any;
  ticketsType = ['Gold', '#3a64f8', 'Green'];
  qrCodes: any;
  qrResult: string | null = null;
  scannerEnabled = false;
  qr_code_urls: any;
  currentPage = 0;

  allItems: any[] = [];

  constructor(private _homeService:HomeService,private router: Router){}
  ngOnInit(): void {

    this._homeService.getQR(this.extractNumber(this.router.url)).subscribe({
      next: (res) => {
        console.log(res);
        this.name = res.event.name_en;
        this.location = res.event.location;
        this.date = res.event.date;
        this.type = res.event.type;
        this.time = res.event.time;
        this.multi_use = res.event.multi_use;
        this.qrCodes = res.qr_code_urls;
        this.allItems = res.qr_code_urls;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
   getQueryString(url: string): string {
    const parts = url.split('?');
    return parts.length > 1 ? parts[1] : '';
  }
   extractNumber(url: string): string | null {
    const match = url.match(/event_(\d+)_qr/);
    return match ? match[1] : null;
  }
}
