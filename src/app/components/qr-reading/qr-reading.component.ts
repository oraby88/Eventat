import { Component, OnInit } from '@angular/core';
import { NewEventService } from '../../shared/services/new-event.service';

@Component({
  selector: 'app-qr-reading',
  standalone: true,
  imports: [],
  templateUrl: './qr-reading.component.html',
  styleUrl: './qr-reading.component.css'
})
export class QrReadingComponent implements OnInit {
  qrData=[];
  constructor(private _newEvent:NewEventService){}
  ngOnInit(): void {
    this._newEvent.data$.subscribe((data) => {
      this.qrData = data;
    })
  }
  getIamge(imageUrl:any){
    // Create a hidden anchor element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(imageUrl);
    // Set the download attribute with a default file name
    link.download = 'qr-image.jpg'; // You can set a specific filename

    // Append the anchor to the body (required for some browsers)
    document.body.appendChild(link);

    // Programmatically click the anchor to trigger the download
    link.click();

    // Remove the anchor from the body after the download is triggered
    document.body.removeChild(link);
  }
  
  
  getQrCodes(){

  }

}
