import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Ng6NotifyPopupService } from 'ng6-notify-popup';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  loginText: any = { textValue: 'Login', displayText: 'Register now' }
  loginDetail: any = { 'navleen@nv.com': 'RDX1234' };
  userNamePassWordError = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notify: Ng6NotifyPopupService
  ) { }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  showSucess(text: string, type: string): void {
    this.notify.show(text, { position: 'top', duration: '3000', type: 'success' });
  }
  get f() { return this.registerForm.controls; }

  formValue(key) {
    return this.registerForm.get(key).value;
  }
  login() {
    if (this.loginDetail[this.formValue('email').trim()] != this.formValue('password').trim()) {
      this.userNamePassWordError = true;
      return;
    }
    this.showSucess("Login Successfully.", "success");
    this.router.navigate(['/registration']);
  }
  updateLoginText(textValue: string, displayText: string) {
    this.loginText.textValue = textValue;
    this.loginText.displayText = displayText;
  }
  register() {
    this.loginDetail[this.formValue('email').trim()] = this.formValue('password').trim();
    this.showSucess("Registerd Successfully", "success");
    this.updateLoginText('Login', 'Register now');
  }
  onLoginOrRegistration(type) {
    this.userNamePassWordError = false;
    if (this.registerForm.invalid) {
      return;
    }
    if (type === 'Login') {
      this.login();
    } else {
      this.register();
    }

  }

  toggleLoginText(type) {
    if (type === 'Login') {
      this.updateLoginText('Register', 'SignIn Now');
    }
    if (type === 'Register') {
      this.updateLoginText('Login', 'Register now');
    }
  }

}
