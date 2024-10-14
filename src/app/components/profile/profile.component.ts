import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../shared/services/profile.service';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LoadingComponent, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  id!: number;
  name!: string;
  email!: string;
  contentReady: boolean = false;
  userData: any;
  qrData: any;

  constructor(private _profileService: ProfileService) {}
  ngOnInit(): void {
    this.contentReady = true;
    this.getData();
  }
  getData(){
    this._profileService.getUser().subscribe({
      next: (res) => {
        this.contentReady = false;
        this.userData = res.user;
        console.log(res);
        // this.name = this.userData.name;
        // this.id = this.userData.id;
        // this.email = this.userData.email;
        // console.log(res.data[0].qrcode);
        this.qrData = res.data[0].qr_code_urls;
      },
      error: (err) =>{
        this.contentReady = false;
        console.log(err)
      }
    })
  }
  getIamge(imageUrl: any) {

  }

  onSubmit() {

  }

}


