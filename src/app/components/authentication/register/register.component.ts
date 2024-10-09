// declare var google: any;
// declare var FB: any;
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
// import { ResigteringService } from '../auth/resigtering.service';
import Swal from 'sweetalert2';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { Register } from '../../../interfaces/register';
import { RegisterService } from '../../../shared/services/auth/register.service';
import { LoginService } from '../../../shared/services/auth/login.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
// import { IRegisterInterface } from '../../../interfaces/registerInterface';
// import { LoginService } from '../auth/login.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, LoadingComponent, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  data!: FormGroup;
  contentReady: boolean = false;
  userInfo: any;

  genders = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
  ];
  // formInfo = new FormGroup({
  //   name: new FormControl(''),
  //   email: new FormControl(''),
  //   phone: new FormControl(''),
  //   gender: new FormControl(''),
  //   password: new FormControl(''),
  //   c_Password: new FormControl(''),
  // });
  // registerRequest: IRegisterInterface = {} as IRegisterInterface;
  errorExit: boolean = false;
  newUserEmail: string = '';
  formInfo!: FormGroup;
  registerRequest: Register = {} as Register;
  constructor(
    private _formBuilder: FormBuilder,
    private _Router: Router,
    private _authService:AuthService
  ) { }

  validateAreEqual(pass: string, c_Pass: string) {
    return (group: FormGroup) => {
      const password = group.controls[pass];
      const c_Password = group.controls[c_Pass];
      if (password.value !== c_Password.value) {
        c_Password.setErrors({ passwordMismatch: true });
      } else {
        c_Password.setErrors(null);
      }
    };
  }

  ngOnInit(): void {

    this.initiate();

    // google.accounts.id.initialize({
    //   client_id:
    //     '546725077344-og6idjh26apotsjpks2r0b311kpdhp48.apps.googleusercontent.com',
    // });
    // document.getElementById('google-btn')!.addEventListener('click', function () {
    //   google.accounts.id.prompt();
    // });
    // (window as any).fbAsyncInit = () => {
    //   FB.init({
    //     appId: '476879578669544',
    //     cookie: true,
    //     xfbml: true,
    //     version: 'v14.0',
    //   });
    //   FB.AppEvents.logPageView();
    // };
  }
  initiate() {
    this.formInfo = this._formBuilder.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(60),
            Validators.pattern('[a-zA-Z\u0600-\u06FF ]*')
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        phone: [
          '',
          [
            Validators.required,
            Validators.pattern(`^\\d{11}$`),
            Validators.minLength(11),
            Validators.maxLength(11),

          ],
        ],
        gender: ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.maxLength(40),
            Validators.minLength(8),
            // Validators.pattern(
            //   '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
            // ),
          ],
        ],
        c_Password: ['', [Validators.required]],
      },
      { validator: this.validateAreEqual('password', 'c_Password') }
    );
  }
  saveEmail(e: string) {
    sessionStorage.setItem('email', e);
  }
  password: string = '';
  isPasswordVisible: boolean = false;
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  onSubmit() {
    this.contentReady = true;
    if (!this.formInfo.valid) {
      console.log('error');
      console.log(this.formInfo.value);
      this.contentReady = false;
      return;
    }
    const selectedGender = this.formInfo.value.gender;
    var fv = this.formInfo.value!;
    this.registerRequest = {
      name: fv.name?.toString() ?? '',
      email: fv.email?.toString() ?? '',
      password: fv.password?.toString() ?? '',
      c_password: fv.c_Password?.toString() ?? '',
      phone: fv.phone?.toString() ?? '',
      gender: selectedGender?.toString() ?? '',
    };
    console.log(this.registerRequest);
    this._authService.user_Resigter(this.registerRequest).subscribe({
      next: (res) => {
        this.contentReady = false;
        Swal.fire({
          icon: 'success',
          title: 'تم تسجيل البيانات بنجاح',
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(res);
        console.log(this.formInfo.value);
        this._authService.setToken(res.token);
        this._Router.navigate(['/home']);
      },
      error: (err) => {
        this.contentReady = false;
        console.log('there is an error');
        Swal.fire({
          icon: 'error',
          title: 'فشل تسجيل البيانات',
          text: err.error.message || 'فشل تسجيل البيانات',
        });
        this.errorExit = true;
      },
    });
  }
  // login() {
  //   FB.login((result: any) => {
  //     if (result.authResponse) {
  //       console.log(result);
  //       console.log(result.authResponse);
  //       const token = result.authResponse.accessToken;
  //       console.log(token);

  //       FB.api(
  //         '/me',
  //         { fields: 'id,name,email,picture', access_token: token },
  //         (userInfo: any) => {
  //           console.log('User information:', userInfo);
  //           this.userInfo = userInfo;
  //           if (this.userInfo != null) {
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
  //                   console.log(res);
  //                   this._Router.navigate(['/Home']);
  //                 },
  //                 error(err) {
  //                   console.error(err);
  //                 },
  //               });
  //             sessionStorage.setItem('loggedInUser', this.userInfo);
  //     }
  //   }
  //   )
  // }
  // }),
  // { scope: 'public_profile,email' };
  // }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  // handleLogin(response: any) {
  //   console.log(response);
  //   if (response) {
  //     //decode token
  //     const payLoad = this.decodeToken(response.credential);
  //     console.log(payLoad);
  //     //my api login
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
  //           //set token in localStorage
  //           this._LoginService.setToken(res.token);
  //           // localStorage.setItem('token', res[1].token);

  //           this._Router.navigate(['/home']);
  //         },
  //         error(err) {
  //           console.error(err);
  //         },
  //       });
  //     //store in session
  //     sessionStorage.setItem('loggedInUser', JSON.stringify(payLoad));
  //     //navigate to home
  //   }
  // }

}
