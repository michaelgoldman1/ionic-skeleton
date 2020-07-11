import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {

  title = 'Sign In';
  subtitle = 'Sign in to your account';
  switchBtnLabel = 'Sign Up';
  switchBtnFn = this.switchToSignUp;
  hasForgotPasswordBtn = true;
  submitFn = this.signIn;

  errorMessages = {
    email: '',
    password: '',
    confirmPassword: '',
    code: ''
  };

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^.*$/)]), // IMPLEMENT pattern validator
    confirmPassword: new FormControl('', [Validators.required, Validators.pattern(/^.*$/)]), // IMPLEMENT pattern validator
    code: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]) // IMPLEMENT proper length requirement
  });
  formChangeSubscription: Subscription;

  constructor() { }

  ionViewWillEnter() {
    switch (this.title) {
      case 'Sign In':
        this.switchToSignIn();
        break;
      case 'Sign Up':
        this.switchToSignUp();
        break;
      case 'Verify Your Email':
        this.switchToVerify();
        break;
      case 'Reset Your Password':
        this.switchToForgotPassword();
        break;
      default:
        this.switchToSignIn();
    }

    if (this.formChangeSubscription != null) {
      this.formChangeSubscription.unsubscribe();
      this.formChangeSubscription = null;
    }
    this.formChangeSubscription = this.form.statusChanges.subscribe(status => {
      console.log(`form status = ${status}`);
      // IMPLEMENT Set errorMessages['inputName'] = 'some text';
    });
  }

  switchToSignUp() {
    this.title = 'Sign Up';
    this.subtitle = 'Create a new account';
    this.switchBtnLabel = 'Sign In';
    this.switchBtnFn = this.switchToSignIn;
    this.hasForgotPasswordBtn = false;
    this.submitFn = this.signUp;
    this.form.controls['email'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirmPassword'].enable();
    this.form.controls['code'].disable();
  }

  switchToSignIn() {
    this.title = 'Sign In';
    this.subtitle = 'Sign in to your account';
    this.switchBtnLabel = 'Create an account';
    this.switchBtnFn = this.switchToSignUp;
    this.hasForgotPasswordBtn = true;
    this.submitFn = this.signIn;
    this.form.controls['email'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirmPassword'].enable();
    this.form.controls['code'].disable();
  }

  switchToVerify() {
    this.title = 'Verify Your Email';
    this.subtitle = 'Enter the code that was sent to your email address';
    this.switchBtnLabel = 'Sign In';
    this.switchBtnFn = this.switchToSignIn;
    this.hasForgotPasswordBtn = true;
    this.submitFn = this.verify;
    this.form.controls['email'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirmPassword'].disable();
    this.form.controls['code'].enable();
  }

  switchToForgotPassword() {
    if (this.form.controls['email'].disabled || this.form.controls['email'].status === 'INVALID') {
      return;
    }
    // IMPLEMENT send code to email
    this.title = 'Reset Your Password';
    this.subtitle = 'Enter the code that was sent to your email address and enter your new password';
    this.switchBtnLabel = 'Sign In';
    this.switchBtnFn = this.switchToSignIn;
    this.hasForgotPasswordBtn = false;
    this.submitFn = this.setNewPassword;
    this.form.controls['email'].disable();
    this.form.controls['password'].enable();
    this.form.controls['confirmPassword'].enable();
    this.form.controls['code'].enable();
  }

  signIn() {
    // IMPLEMENT
  }

  signUp() {
    // IMPLEMENT
  }

  verify() {
    // IMPLEMENT
  }

  setNewPassword() {
    // IMPLEMENT
  }

}
