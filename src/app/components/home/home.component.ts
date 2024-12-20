import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HomeService } from '../../shared/services/home.service';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, LoadingComponent, MatPaginator],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit {
  qrData: any;
  isLogedout: boolean = false;
  contentReady: boolean = false;
  token: any;

  allItems: any[] = [];
  displayedItems: any[] = [];
  pageSize = 5;
  dataIsHere: boolean = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _homeService: HomeService, private router: Router) {}
  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => this.updateDisplayedItems());
  }
  ngOnInit(): void {
    this.contentReady = true;
    

    this.getData();
    if (typeof window !== 'undefined' && localStorage) {
      let token = localStorage.getItem('token');

      if (token) {
        this.isLogedout = false;
      } else {
        this.isLogedout = true;
      }
    }
  }
  updateDisplayedItems() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.displayedItems = this.allItems.slice(startIndex, endIndex);
  }
  handlePageEvent(pageEvent: PageEvent) {
    console.log(pageEvent);
  }
  getData() {
    this._homeService.getEventsList().subscribe({
      next: (response) => {
        this.contentReady = false;
        this.dataIsHere = true;
        console.log(response);
        this.qrData = response.data;
        this.allItems = response.data;
        console.log(this.qrData);
        this.updateDisplayedItems();
      },
      error: (error) => {
        this.contentReady = false;
        this.dataIsHere = false;
        console.log(this.dataIsHere);
        
        console.error('Error:', error);
      },
    });
  }

  goToQrCode(id: any) {
    this.router.navigate(['/qr-sacn', id]);
  }
  // getQrCode(id: any, location: string,
  //   date: string,
  //   time: string,
  //   type: string,
  //   multi_use: number,
  // name_ar:string,name_en:string) {
  //   this.token = localStorage.getItem("token");
  //   if (this.token) {
  //     this._homeService.getQR(id,location,date,time,type,multi_use,name_ar,name_en).subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.router.navigate(['/qr-sacn', id]);
  //       },
  //       error: (error) => {
  //         console.log(error);
  //       }
  //     })
  //   }
  //   else {
  //   }
  // }
  logout() {
    console.log('loged out');
    localStorage.removeItem('token');
    // window.location.reload();
    this.isLogedout = true;
    this.getData();
  }

  
}
