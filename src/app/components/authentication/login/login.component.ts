// declare var google: any;
// declare var FB: any;
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../../shared/services/auth/login.service';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoadingComponent,
    FormsModule,
    LoadingComponent,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  person!: FormGroup;
  contentReady: boolean = false;
  loggedIn!: boolean;
  userEmail!: string;
  userName!: string;
  userInfo: any;
  googleResponse: any;
  tokenExists!: boolean;
  constructor(
    private _FormBuilder: FormBuilder,
    private _authService: AuthService,
    private _Router: Router
  ) {}
  password: string = '';
  isPasswordVisible: boolean = false;
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  google: any;
  ngOnInit(): void {
    this.initiate();
    // google.accounts.id.initialize({
    //   client_id:
    //     '546725077344-og6idjh26apotsjpks2r0b311kpdhp48.apps.googleusercontent.com',
    //   callback: (res: any) => this.handleLogin(res),
    // });
    // document
    //   .getElementById('google-btn')!
    //   .addEventListener('click', function () {
    //     debugger
    //     google.accounts.id.prompt();
    //   });
    // (window as any).fbAsyncInit = () => {
    //   FB.init({
    //     appId: '476879578669544',
    //     cookie: true,
    //     xfbml: true,
    //     version: 'v14.0',
    //   });
    //   FB.AppEvents.logPageView();
    // };

    this.checkForToken();
    if (this.tokenExists) {
      this._Router.navigateByUrl('/home');
    }
  }
  initiate() {
    this.person = this._FormBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  checkForToken() {
    this._authService.token$.subscribe((token) => {
      // Update the tokenExists flag based on the token presence
      this.tokenExists = token != null;
    });
  }

  // login() {
  //   FB.login((result: any) => {
  //     if (result.authResponse) {
  //       const token = result.authResponse.accessToken;
  //       FB.api(
  //         '/me',
  //         { fields: 'id,name,email,picture', access_token: token },
  //         (userInfo: any) => {
  //           this.userInfo = userInfo;
  //           if (userInfo != null) {
  //             this._LoginService
  //               .loginWithFacebook(this.userInfo.name, this.userInfo.id)
  //               .subscribe({
  //                 next: (res) => {
  //                   this.contentReady = false;
  //                   Swal.fire({
  //                     icon: 'success',
  //                     title: 'تم تسجيل الدخول بنجاح',
  //                     showConfirmButton: false,
  //                     timer: 1500,
  //                   });
  //                   //set token in localStorage
  //                   this._LoginService.setToken(res.token);
  //                   this._Router.navigate(['/Home']);
  //                 },
  //                 error(err) {
  //                   console.error(err);
  //                 },
  //               });
  //             sessionStorage.setItem('loggedInUser', this.userInfo);
  //           }
  //         }
  //       );
  //       console.log(this.userInfo);
  //     }
  //   }),
  //     { scope: 'public_profile,email' };
  // }
  // private decodeToken(token: string) {
  //   return JSON.parse(atob(token.split('.')[1]));
  // }
  // handleLogin(response: any) {
  //   if (response) {
  //     const payLoad = this.decodeToken(response.credential);
  //     console.log(payLoad);
  //     this._LoginService
  //       .loginWithGoogle(payLoad.email, payLoad.name)
  //       .subscribe({
  //         next: (res) => {
  //           this.contentReady = false;
  //           Swal.fire({
  //             icon: 'success',
  //             title: 'تم تسجيل الدخول بنجاح',
  //             showConfirmButton: false,
  //             timer: 1500,
  //           });
  //           console.log(res);
  //           this._LoginService.setToken(res.token);
  //           this._Router.navigate(['/home']);
  //         },
  //         error(err) {
  //           console.error(err);
  //         },
  //       });
  //     sessionStorage.setItem('loggedInUser', JSON.stringify(payLoad));
  //   }
  // }

  onSubmit() {
    this.contentReady = true;
    this._authService.user_login(this.person.value).subscribe({
      next: (res) => {
        this.contentReady = false;
        Swal.fire({
          icon: 'success',
          title: 'تم تسجيل الدخول بنجاح',
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(res);
        this._authService.setToken(res.token);
        localStorage.setItem('id', res.user.id);
        this._Router.navigate(['/home']);
      },
      error: (err) => {
        this.contentReady = false;
        console.log('there is an error');
        Swal.fire({
          icon: 'error',
          title: 'فشل تسجيل الدخول',
          text: err.error,
        });
        console.log(err);
      },
    });
  }
}
