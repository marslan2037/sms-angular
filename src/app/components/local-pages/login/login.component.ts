import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form:any; 

    constructor(private fb: FormBuilder, private router: Router) { }

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
            console.log('this form is valid');

            sessionStorage.setItem('token', '123456');
            this.router.navigateByUrl('/home');
        } else {
            console.log('this form is not valid')
        }
    }
}
