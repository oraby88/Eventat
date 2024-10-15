import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../shared/services/home.service';

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
  ticketsType = ['Gold', 'Blue', 'Green'];
  qrCodes: any;
  qrResult: string | null = null;
  scannerEnabled = false;
  qr_code_urls: any;
  currentPage = 0;

  allItems: any[] = [];

  constructor(private _homeService:HomeService){}
  ngOnInit(): void {
    this._homeService.getQR(1).subscribe({
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


}
