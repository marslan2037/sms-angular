import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { ApiService } from 'src/app/services/api-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    spinner_name:any = 'sp1';
    form:any; 

    constructor(
        private fb: FormBuilder, 
        private router: Router,
        private api_service: ApiService,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService
    ) { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            'email': ['', [Validators.required]],
			'password': ['', [Validators.required, Validators.minLength(6)]]
        })
    }

    submit() {
        if(this.form.valid) {
            this.spinner.show(this.spinner_name);
            this.api_service.login(this.form.value).subscribe((response:any) => {
                let data = JSON.parse(response);
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('name', data.name);
                sessionStorage.setItem('email', data.email);

                this.router.navigateByUrl('/home');
                this.spinner.hide(this.spinner_name);
                this.toastr.success('You are logged in');
            }, error => {
                this.spinner.hide(this.spinner_name);
                console.log(error);
                this.toastr.error(error.error);
            })
        } else {
            console.log('this form is not valid')
        }
    }
}
