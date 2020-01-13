import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Ng6NotifyPopupService } from 'ng6-notify-popup';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  usaStates: String[] = [ "Andhra Pradesh", "Arunachal Pradesh",  "Assam",  "Bihar",  "Chhattisgarh",  "Goa",
  "Gujarat",  "Haryana",  "Himachal Pradesh",  "Jammu and Kashmir",  "Jharkhand",  "Karnataka",  "Kerala",
  "Madhya Pradesh",  "Maharashtra",  "Manipur",  "Meghalaya",  "Mizoram",  "Nagaland",  "Odisha",  "Punjab",
  "Rajasthan",  "Sikkim",  "Tamil Nadu",  "Telangana",  "Tripura",  "Uttarakhand",  "Uttar Pradesh",  "West Bengal",
  "Andaman and Nicobar Islands",  "Chandigarh",  "Dadra and Nagar Haveli",  "Daman and Diu",  "Delhi",  "Lakshadweep",  "Puducherry"];


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notify: Ng6NotifyPopupService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      block: ['', Validators.required],
      village: ['', Validators.required],
      district: ['', Validators.required],
      mukhia: ['', Validators.required],
      dob: ['', Validators.required],
      aadhar: ['', Validators.required],
      mobile: ['', Validators.required],
      alternateMobile: ['', Validators.required],
      physicalAddress: ['', [Validators.required]],
      mailingAddress: ['', [Validators.required, Validators.minLength(6)]],
      city: ['', [Validators.required, Validators.maxLength(100)]],
      //usaStatesIs: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(9)]]
    });
  }

  showSucess(text: string, type: string): void {
    this.notify.show(text, { position: 'top', duration: '3000', type: 'success' });
  }
  get f() { return this.registerForm.controls; }

  formValue(key) {
    return this.registerForm.get(key).value;
  }

  onRegistration() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log('validation working ----');
      return;
    }
    console.log("On registration call");
    this.showSucess("Detail Submited Successfully.", "success");
    this.router.navigate(['/fuelquote']);
  }

}
