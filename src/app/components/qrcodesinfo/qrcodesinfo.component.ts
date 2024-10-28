import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../shared/services/home.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { scanReq } from '../../interfaces/scan';
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
  scanReq: scanReq = {} as scanReq;
  multi_use!: number;
  tokenExists!: boolean;
  eventData: any;
  ticketsType = ['VIP', 'blue', 'Green'];
  qrCodes: any;
  qrResult: string | null = null;
  scannerEnabled = false;
  qr_code_urls: any;
  currentPage = 0;

  allItems: any[] = [];

  constructor(private _homeService:HomeService,private _authService:AuthService,private router: Router){}
  ngOnInit(): void {
    this.checkForToken();
if(this.tokenExists == false){
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
    else{
      this.scanReq = {
        event_id : this.extractNumber(this.router.url) ?? '',
        qrcode_id : this.getQrNumberFromUrl(this.router.url) ?? ''
      }
      console.log(this.scanReq.event_id);
      console.log(this.scanReq.qrcode_id);
      this._homeService.scan(this.scanReq).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
  checkForToken() {
    this._authService.token$.subscribe((token) => {
      // Update the tokenExists flag based on the token presence
      this.tokenExists = token != null;
    });
  }
  getQrNumberFromUrl(url: string): string | null {
    // Improved pattern to capture the number after 'qr_' and before '.png'
    const match = url.match(/qr_(\d+)=?/);

    // Debugging output to check the match
    console.log("Match result:", match);

    return match ? match[1] : null;
}
   extractNumber(url: string): string | null {
    const match = url.match(/event_(\d+)_qr/);
    return match ? match[1] : null;
  }

}
