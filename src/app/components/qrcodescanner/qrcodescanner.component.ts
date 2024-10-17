import { Component } from '@angular/core';
import { ScannerIneModule } from 'ngx-scanner';
@Component({
  selector: 'app-qrcodescanner',
  standalone: true,
  imports: [],
  templateUrl: './qrcodescanner.component.html',
  styleUrl: './qrcodescanner.component.css'
})

export class QrcodescannerComponent {
  tokenExists!: boolean;
}
