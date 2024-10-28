import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgetPasswordService } from '../../../shared/services/auth/forget-password.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, LoadingComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  contentReady: boolean = false;
  afterSendCode: boolean = false;
  person!: FormGroup;
  str1!: string;
  str2!: string;
  str3!: string;
  str4!: string;
  errorExist!: boolean;
  str: string = '';
  formInfo = new FormGroup({
    verificationCode1: new FormControl(''),
    verificationCode2: new FormControl(''),
    verificationCode3: new FormControl(''),
    verificationCode4: new FormControl(''),
    password: new FormControl(''),
    c_Password: new FormControl(''),
  });
  email!: string;
  constructor(
    private _forgetPasswordService: ForgetPasswordService,
    private _FormBuilder: FormBuilder,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.person = this._FormBuilder.group({
      email: ['', Validators.required],
    });

    this.formInfo = this._FormBuilder.group(
      {
        verificationCode1: ['', [Validators.required, Validators.maxLength(1)]],
        verificationCode2: ['', [Validators.required, Validators.maxLength(1)]],
        verificationCode3: ['', [Validators.required, Validators.maxLength(1)]],
        verificationCode4: ['', [Validators.required, Validators.maxLength(1)]],
        password: [
          '',
          [
            Validators.required,
            Validators.maxLength(40),
            Validators.minLength(8),
          ],
        ],
        c_Password: ['', [Validators.required]],
      },
      { validator: this.validateAreEqual('password', 'c_Password') }
    );
  }

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

  sendEmail() {
    this.contentReady = true;
    this.email = this.person.value.email;
    this._forgetPasswordService
      .forgetPassword(this.person.value.email)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.afterSendCode = true;
          this.contentReady = false;
        },
        error: (err) => {
          this.contentReady = false;
          console.log(err)}
      });
  }

  onSubmit() {
    this.contentReady = true;
    if (!this.formInfo.valid) {
      this.contentReady = false;
      console.log(this.str1);
      return;
    }
    this.str = `${this.str1}${this.str2}${this.str3}${this.str4}`;
    console.log(this.str1);

    this._forgetPasswordService
      .newPassword(
        this.email,
        this.str,
        this.formInfo.value.password!,
        this.formInfo.value.c_Password!
      )
      .subscribe({
        next: (res) => {
          this.contentReady = false;
          sessionStorage.setItem('token', res.token);
          this._forgetPasswordService.setToken(res.token);

          this._router.navigate(['/home']).then(() => {
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

  isPasswordVisible: boolean = false;
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  moveFocus(currentInput: HTMLInputElement, nextInput: HTMLInputElement) {
    if (currentInput.value.length === 1) {
      nextInput.focus();
    }
  }
}
