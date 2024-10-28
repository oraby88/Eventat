import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VerificationService } from '../../../shared/services/auth/verification.service';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-verification-code',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, LoadingComponent, CommonModule],
  templateUrl: './verification-code.component.html',
  styleUrl: './verification-code.component.css'
})
export class VerificationCodeComponent {

  contentReady: boolean = false;
  str1!: string;
  str2!: string;
  str3!: string;
  str4!: string;
  errorExist!: boolean;
  str: string = '';

  formVerification = new FormGroup({
    verificationCode1: new FormControl(''),
    verificationCode2: new FormControl(''),
    verificationCode3: new FormControl(''),
    verificationCode4: new FormControl('')
  });

  constructor(
    private formBuilder: FormBuilder,
    private _registerService: VerificationService,
    private _Router: Router,
    private _auth:AuthService
  ) {}

  ngOnInit(): void {
    this.gotoTop()
    this.formVerification = this.formBuilder.group({
      verificationCode1: ['', [Validators.required, Validators.maxLength(1)]],
      verificationCode2: ['', [Validators.required, Validators.maxLength(1)]],
      verificationCode3: ['', [Validators.required, Validators.maxLength(1)]],
      verificationCode4: ['', [Validators.required, Validators.maxLength(1)]]
    });
  }

  verificationSubmit() {
    this.contentReady = true;
    if (!this.formVerification.valid) {
      this.contentReady = false;
      console.log(this.str1);
      return;
    }
    this.str = `${this.str1}${this.str2}${this.str3}${this.str4}`;
    console.log(this.str1);

    this._registerService.verificationCode(this.str).subscribe({
      next: (res) => {
        this.contentReady = false;
        // sessionStorage.setItem('token', res.token);
        this._auth.setToken(res.token);
        this._Router.navigate(['/home']).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        this.contentReady = false;
        this.errorExist = true;
        console.log(err);
      },
    });
  }

  // skip() {
  //   this.contentReady = true;

  //   this._registerService.SkipVerificationCode().subscribe({
  //     next: (res) => {

  //       this.contentReady = false;
  //       localStorage.setItem('token', res.token);
  //       this._registerService.setToken(res.token);

  //       this._Router.navigate(['/Home']).then(() => {
  //         window.location.reload();
  //       });

  //     },
  //     error: (err) => {
  //       this.contentReady = false;
  //       this.errorExist = true;
  //       console.log(err);
  //     },
  //   });
  // }
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  moveFocus(currentInput: HTMLInputElement, nextInput: HTMLInputElement){
    if(currentInput.value.length === 1){
      nextInput.focus();
    }
  }

}
